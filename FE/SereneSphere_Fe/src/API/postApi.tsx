// import axios from 'axios';
import { API, JonParse, JsonStringify } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const get_friend_posts_api = '/api/v1/user/post/loadPost';
const get_posts_profile_api = '/api/v1/user/post/load/post/profile';
const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
}
const postApi = {

    loadPost: async (): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.get(`${get_friend_posts_api}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data.posts);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error loadPost in:', error);
            throw error;
        }
    },
    loadPostProfile: async (id): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.post(`${get_posts_profile_api}`,{id}, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error loadPostProfile in:', error);
            throw error;
        }
    },
}

export default postApi