import { Json } from 'sequelize/lib/utils'
import * as services from '../services'
//Load data follower
export const loadFollower =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const response =await services.loadFollower(id);
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}
//load data suggests
export const loadSuggest =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const {page} = req.body;
        const response =await services.loadSuggests(id,{page});
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}