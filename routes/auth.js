import expres from 'express'
import { createUser, googleAuth, signin } from '../controllers/auth.js'

const router = expres.Router()

//Create user
router.post('/signup', createUser)

//sign in
router.post('/signin', signin)

//google auth
router.post('/google', googleAuth)

export default router