// import axios from 'axios';
import { API, JonParse, JsonStringify } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const get_phoneBook_api = '/api/v1/user/message/load/phoneBook';
const post_list_message_api='/api/v1/user/message/load/list/messages';
const post_list_friend_message_api='/api/v1/user/message/load/list/friends';
// const get_suggests_api='/api/v1/user/follow/loadSuggests';
const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
}
const messagesApi = {

    loadPhoneBook: async (): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.get(`${get_phoneBook_api}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error messages api in:', error);
            throw error;
        }
    },
    loadListMessages: async (to): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.post(`${post_list_message_api}`,{to}, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error messages api in:', error);
            throw error;
        }
    },
    loadListFriendMessages: async (id): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.post(`${post_list_friend_message_api}`,{id}, {
                headers: {
                    'Authorization': token,
                }
            });
            // console.log('response.data: ',JSON.stringify(response.data.messages))
            // return JonParse(response.data.messages[0]);
            return response.data.messages;
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error messages api in:', error);
            throw error;
        }
    },

    
}

export default messagesApi