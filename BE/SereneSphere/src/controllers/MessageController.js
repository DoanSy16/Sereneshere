// import { Json } from 'sequelize/lib/utils'
import * as services from '../services'
import userChatStorage from '../storage/UserChatStorage'
export const loadPhoneBook =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const response =await services.loadPhoneBook(id);
        userChatStorage.setUser(id,response.messages);
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}

export const loadFriends =async (req,res)=>{
    try {
        const {id} =  req.body;
        console.log('id: '+id)
        const response =await services.loadListFriendsMessagesProfile(id);
        return res.status(200).json(response); 
        // return res.status(200).json(null); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}

export const loadListMessages =async (req,res)=>{
    try {
        const id = req.authorization.id;
        const {to} = req.body;
        console.log("to: "+to);
        const response =await services.loadListMessages({id,to});
        // userChatStorage.setUser(id,response.messages);
        return res.status(200).json(response); 
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes:'interval server error'
        })
    }
}