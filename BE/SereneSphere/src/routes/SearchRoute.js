import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/veryfi_token'
const router =express.Router()
router.use(verifyToken)
router.get('/load/search',controllers.loadSearch);
router.post('/load/quick_search',controllers.quick_search);
// router.post('/load/post/profile',controllers.loadPostProfile);
module.exports=router