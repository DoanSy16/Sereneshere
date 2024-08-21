import * as services from '../services'
export const loadSearch =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const response =await services.loadSearch(id);
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}

export const quick_search =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const {content} =req.body;
        const response =await services.quick_search(id,{content});
        
        // const response =null;
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}