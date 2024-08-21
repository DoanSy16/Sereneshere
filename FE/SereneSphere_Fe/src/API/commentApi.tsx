// import axios from 'axios';
import { API, JonParse, JsonStringify } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const get_comments = '/api/v1/user/comment/loadComment';
const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
}
const commentApi = {

    loadComment: async (data: any): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.post(`${get_comments}`,data, {
                headers: {
                    'Authorization': token,
                }
                
            });
            // console.log("response: "+response.data.comments)
            if(response.data.comments == undefined){
                return null;
            }
            return JonParse(response.data.comments);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}

export default commentApi