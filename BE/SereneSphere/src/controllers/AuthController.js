import * as services from '../services'
export const login =async (req,res )=>{
    try {
        const {email ,password} = req.body;
        // console.log('email: '+ email)
        if(!email || !password){
            return res.status(400).json({
                err:1,
                mes:'Missing payloads'
            })
        }
        const response =await services.Login({email ,password})
       return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}