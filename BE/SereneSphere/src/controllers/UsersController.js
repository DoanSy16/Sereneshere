import * as services from '../services'

export const findAllUsers = async (req,res)=>{
    try {
        const response = await services.findAllUser();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'internal server error'
        })
    }
}