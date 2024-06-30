import db from '../models';
import  sequelize  from '../connection_database';
import { QueryTypes } from 'sequelize';
export const loadFollower= (id)=>new Promise(async(resolve, reject)=>{
    try {
        const follows = await sequelize.query('SELECT * FROM get_follower(:id) limit 15', {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        const countFollow  =await sequelize.query('SELECT  count(f.user_id) as count  FROM follower f WHERE f.follower_id =(:id)', {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

// console.log(countFollow)
        if ((!follows || follows.length === 0) && countFollow >0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', follows: follows,countFollow: countFollow[0].count  });
    } catch (error) {
        reject(error)
        console.log("error in load follower: " + error)
    }
})
export const loadSuggests= (id,{page})=>new Promise(async(resolve, reject)=>{
    try {
        const pageSuggest =page*8;
        const suggests = await sequelize.query('SELECT * FROM get_suggested(:id) LIMIT 8 OFFSET :pageSuggest', {
            replacements: { id,pageSuggest },
            type: QueryTypes.SELECT,
        });

        if (!suggests || suggests.length === 0) {
            resolve({
                err: -1,
                message: 'not found suggests'
            });
            return;
        }

        resolve({ message: 'find successfully', suggests: suggests });
    } catch (error) {
        reject(error)
        console.log("error in load suggest: " + error)
    }
})