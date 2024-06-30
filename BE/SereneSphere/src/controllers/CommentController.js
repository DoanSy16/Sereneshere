import * as services from '../services'
//Load data comments
export const loadCommentPost =async (req,res)=>{
    try {
        const {idPost,idComment} = req.body;
        // const id = req.authorization.id;
        const response =await services.loadCommentPost({idPost,idComment});
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}