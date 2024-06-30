import jwt from 'jsonwebtoken'
import { badRequest } from './handle_errors'
const verifyToken = (req, res, next) => {
  // const token = req.headers.authorization
  const token = req.headers.authorization
  if (!token)return res.status(401).json({
    err:-1,
    messages:'not found token'
  })
  const accessToken = token.split(' ')[1]
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
    if (err) 
        return res.status(401).json({
            err:-1,
            messages:'Require authorization!'
          })
    req.authorization = JSON.parse(JSON.stringify(decode))
    next()
  })
}
export default verifyToken
