
import  sequelize  from '../connection_database';
import { QueryTypes } from 'sequelize';
export const loadPost= (id)=>new Promise(async(resolve, reject)=>{
    try {
        // console.log('id: '+id)
        const posts = await sequelize.query('SELECT * FROM get_friend_posts(:id) g where g.post_status = true', {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        if (!posts || posts.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }
// console.log('posts: '+JSON.stringify(posts) )

        resolve({ message: 'find successfully', posts: posts  });
    } catch (error) {
        reject(error)
        console.log("error in load post: " + error)
    }
});

export const loadPostProfile= (id)=>new Promise(async(resolve, reject)=>{
    try {
        // console.log('id: '+id)
        const posts = await sequelize.query('select *from get_friend_posts(:id) g where g.user_id =:id', {
            replacements: { id },
            type: QueryTypes.SELECT,
        });

        if (!posts || posts.length === 0) {
            resolve({
                err: -1,
                message: 'not found'
            });
            return;
        }
        resolve({ message: 'find successfully', posts: posts  });
    } catch (error) {
        reject(error)
        console.log("error in load post: " + error)
    }
})