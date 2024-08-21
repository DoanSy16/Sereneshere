import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;

const userApi ={
    userLogin: async (userData: any): Promise<any> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, userData);
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}
export default userApi