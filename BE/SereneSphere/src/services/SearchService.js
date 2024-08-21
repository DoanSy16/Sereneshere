import  sequelize  from '../connection_database';
import { QueryTypes } from 'sequelize';
export const loadSearch= (id)=>new Promise(async(resolve, reject)=>{
    try {
        const query =`select u.user_id,u.fullname,u.avatar 
                        from "search" s inner join users u on s.id_user_search =u.user_id 
                        where s.id_login =${id} and  u.ban =false and u.user_status = true 
                        order by s.date_search desc`
        const search = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        if (!search || search.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', search: search  });
    } catch (error) {
        reject(error)
        console.log("error in load search: " + error)
    }
});

export const quick_search =(id,{content})=>new Promise(async(resolve, reject)=>{
    try {
        const query =`select *from search_friend_1(${id},'${content}');`
        console.log('query: ',query)
        const search = await sequelize.query(query, {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        resolve({ message: 'find successfully', search: search  });
    } catch (error) {
        reject(error)
        console.log("error in load quick search: " + error)
    }
});