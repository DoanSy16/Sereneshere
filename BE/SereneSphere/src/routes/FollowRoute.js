import * as controllers from '../controllers'
import express from 'express'
import verifyToken from '../middlewares/veryfi_token'
const router =express.Router()
router.use(verifyToken)
router.get('/loadFollower',controllers.loadFollower)
router.post('/loadSuggests',controllers.loadSuggest)
module.exports=router