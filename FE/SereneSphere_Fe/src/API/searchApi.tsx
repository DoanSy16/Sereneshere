import { API, JonParse, JsonStringify } from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const get_search_api = '/api/v1/user/search/load/search';
const post_quick_search_api = '/api/v1/user/search/load/quick_search';

const getToken = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    return token;
}
const searchApi = {
    loadSearch: async (): Promise<any> => {
        try {
            const token = await getToken();
            const response = await API.get(`${get_search_api}`, {
                headers: {
                    'Authorization': token,
                }
            });
            return JonParse(response.data.search);
            // return dispatch({ type: 'LOAD_POST_DATA_SUCCESS', payload: JonParse(response.data.posts) });

        } catch (error) {
            console.error('Error loadPost in:', error);
            throw error;
        }
    },
    quickSearch: async (content)=>{
        return new Promise(async (resolve, reject) => {
            try {
                // setTimeout(async () => {
                    const token = await getToken();
                    const response = await API.post(`${post_quick_search_api}`, { content }, {
                        headers: {
                            'Authorization': token,
                        }
                    });
                    resolve(JonParse(response.data.search));
                // }, 500);
            } catch (error) {
                console.error('Error loadPost in:', error);
                reject(error);
            }
        });
    },
}
export default searchApi;