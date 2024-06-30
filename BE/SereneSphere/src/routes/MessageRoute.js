import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/veryfi_token'
const router =express.Router()
router.use(verifyToken)
router.get('/load/phoneBook',controllers.loadPhoneBook);
router.post('/load/list/messages',controllers.loadListMessages);
router.post('/load/list/friends',controllers.loadFriends);
module.exports=router