import * as controllers from '../controllers'
import verifyToken from '../middlewares/veryfi_token'
import express from 'express'
const router =express.Router()

router.get('/',controllers.findAllUsers)
module.exports= router