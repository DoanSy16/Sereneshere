import db from '../models';
import  sequelize  from '../connection_database';
import { QueryTypes } from 'sequelize';
export const loadCommentPost= ({idPost,idComment})=>new Promise(async(resolve, reject)=>{
    try {
        const comments = await sequelize.query('select *from get_comments(:idPost,:idComment) limit 15', {
            replacements: { idPost,idComment },
            type: QueryTypes.SELECT,
        });

// console.log(countFollow)
        if (!comments || comments.length === 0 ) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }

        resolve({ message: 'find successfully', comments: comments });
    } catch (error) {
        reject(error)
        console.log("error in load follower: " + error)
    }
})
