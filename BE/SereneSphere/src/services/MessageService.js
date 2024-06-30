
import  sequelize  from '../connection_database';
import { QueryTypes } from 'sequelize';
export const loadPhoneBook= (id)=>new Promise(async(resolve, reject)=>{
    try {
        // console.log('id: '+id)
        const messages = await sequelize.query('select *from get_friend(:id)', {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        if (!messages || messages.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', messages: messages  });
    } catch (error) {
        reject(error)
        console.log("error in load phone book: " + error)
    }
});
export const loadListMessages= ({id ,to})=>new Promise(async(resolve, reject)=>{
    try {
        // console.log('id: '+id)
        const messages = await sequelize.query('select *from get_messages(:id,:to)', {
            replacements: { id,to },
            type: QueryTypes.SELECT,
        });

        if (!messages || messages.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', messages: messages  });
    } catch (error) {
        reject(error)
        console.log("error in load list messages: " + error)
    }
});


export const loadListFriendsMessagesProfile= (id)=>new Promise(async(resolve, reject)=>{
    try {
        const friends = await sequelize.query('select *from get_profile(:id)', {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        if (!friends || friends.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', messages: friends  });
    } catch (error) {
        reject(error)
        console.log("error in load list messages: " + error)
    }
});

export const sendMessages= ({ content,time,sender_id,type,to_user })=>new Promise(async(resolve, reject)=>{
    try {
        time =new Date();
        const messages = await sequelize.query('SELECT * FROM insert_message_and_return( :content,:time,:sender_id,:type,:to_user)', {
            replacements: { content,time,sender_id,type,to_user },
            type: QueryTypes.SELECT,
        });

        if (!messages || messages.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', messages: messages  });
    } catch (error) {
        reject(error)
        console.log("error in load list messages: " + error)
    }
});

export const countMessagesUnread= (id)=>new Promise(async(resolve, reject)=>{
    try {
        const query =`  WITH rooms AS (
                        SELECT cp.chat_id 
                        FROM chat_participants cp 
                        WHERE cp.user_id = ${id}
                        ),
                        counts AS (
                            SELECT count(m.id)
                            FROM messages m 
                            WHERE m.chat_id IN (SELECT chat_id FROM rooms) and m.send_status =false and m.sender_id <> ${id}
                        )
                        SELECT * FROM counts;`
        const count = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        if (!count) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', messages: count  });
    } catch (error) {
        reject(error)
        console.log("error in load list messages: " + error)
    }
});

export const updatePhoneBook= (id1,id2)=>new Promise(async(resolve, reject)=>{
    try {
        const messages = await sequelize.query('select *from get_friend(:id1) gf where gf.user_id =:id2', {
            replacements: { id1,id2 },
            type: QueryTypes.SELECT,
        });

        if (!messages || messages.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', messages: messages  });
    } catch (error) {
        reject(error)
        console.log("error in load list messages: " + error)
    }
});

export const updateStatusMessages= (from,to)=>new Promise(async(resolve, reject)=>{
    try {
    const query = `update messages set send_status = true where 
                   send_status = false and sender_id = ${to} and 
                   chat_id =(select *from get_room_chat( ${from},  ${to}))`
        const update = await sequelize.query(query, {
            // replacements: { from, to },
            type: QueryTypes.SELECT,
        });

        if (update[1] === 0) { // update[1] chứa số lượng hàng được cập nhật
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'Update successful' });
    } catch (error) {
        reject(error)
        console.log("error in load list messages: " + error)
    }
});