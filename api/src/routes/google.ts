import express from 'express'
import { googleLogin, googleSignup } from '../controllers/socialauth/google-auth'

const router = express.Router()

router.post('/login',googleLogin)
router.post('/signup',googleSignup)


export default router