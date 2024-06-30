import { Json } from 'sequelize/lib/utils'
import * as services from '../services'
export const loadPost =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const response =await services.loadPost(id);
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}
export const loadPostProfile =async (req,res)=>{
    try {
        const {id} = req.body;
        const response =await services.loadPostProfile(id);
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}