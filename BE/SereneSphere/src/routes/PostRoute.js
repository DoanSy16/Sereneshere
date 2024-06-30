import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/veryfi_token'
const router =express.Router()
router.use(verifyToken)
router.get('/loadPost',controllers.loadPost);
router.post('/load/post/profile',controllers.loadPostProfile);
module.exports=router