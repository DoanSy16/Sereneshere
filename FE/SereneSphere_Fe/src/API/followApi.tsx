// import axios from 'axios';
import { API, JonParse, JsonStringify } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const get_follower_api = '/api/v1/user/follow/loadFollower';
const get_suggests_api='/api/v1/user/follow/loadSuggests';
const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
}
const followApi = {

    loadFollow: async (): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.get(`${get_follower_api}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    loadSuggests: async (data:any): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.post(`${get_suggests_api}`,data, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data.suggests);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}

export default followApi