import { JSON, JSONB } from 'sequelize';
import * as services from '../src/services';
import userChatStorage from '../src/storage/UserChatStorage';

export const connection_socket = (io) => {
  io.on('connection', (socket) => {


    socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id);
    });

    socket.on('error', (error) => {
      console.error('Socket error: ', error);
    });

    socket.on('test-event', (data) => {
      console.log('Received test-event with data: ', data);
    });

    socket.on('create-id-socket', (data) => {
      socket.join(data.message); // Join room with the user id
      socket.user_id = data.message;
    });

    socket.on('send-messages', async (data) => {
      const sender_id = parseInt(data.message.sender_id);
      const to_user = data.message.to_user;
      const response = await services.sendMessages(data.message);

      io.to(sender_id).emit('Server-send-data-messages', response);
      io.to(to_user).emit('Server-send-data-messages', response);

      updatePhoneBookFromUser(sender_id, to_user);
      updatePhoneBookToUser(sender_id, to_user);

      await countMessages(to_user);
    });

    socket.on('count-messages-un-read', async (data) => {
      await countMessages(data.message);
    });

    socket.on('update-status-messages', async (data) => {
      console.log(data.message)
      const sender_id = parseInt(data.message.sender_id);
      const to_user = parseInt(data.message.to_user);
      const response =await services.updateStatusMessages(sender_id,to_user);
      updatePhoneBookFromUser(sender_id, to_user);
      updatePhoneBookToUser(sender_id, to_user);
    });
    


    const updatePhoneBookFromUser = async (sender_id, to_user) => {
      const response_phone_book_from_id = await services.updatePhoneBook(sender_id, to_user);
      io.to(sender_id).emit('Server-send-data-phone-book-from-user', response_phone_book_from_id.messages);
    }

    const updatePhoneBookToUser = async (sender_id, to_user) => {
      const response_phone_book_to_id = await services.updatePhoneBook(to_user, sender_id);
      io.to(to_user).emit('Server-send-data-phone-book-to-user', response_phone_book_to_id.messages);
    }

    const countMessages = async (id) => {
      const sender_id = parseInt(id);
      const response = await services.countMessagesUnread(sender_id);
      io.to(sender_id).emit('call-count-messages-un-read', response.messages[0].count);
    }

  });
};
