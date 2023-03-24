import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    console.log(req.cookies)
    if(!token) return next(createError(401, 'You are not authenticated!'))

    jwt.verify(token, '!mysecret', (err, user) => {
        if(err) return next(createError(403, 'Invalid token.'))

        req.user = user
        next()
    })
}