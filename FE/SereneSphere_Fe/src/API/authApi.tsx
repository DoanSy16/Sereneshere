import axios from 'axios';
import { API, JonParse, JsonStringify } from './index'
const loginApi = '/api/v1/oauth/login';

const authApi = {
    Login: async (data: any): Promise<any> => {
        try {
            const response = await API.post(`${loginApi}`, data);
            return JonParse(response.data.user);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}

export default authApi