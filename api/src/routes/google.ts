import express from 'express'
import { googleLogin, googleSignup } from '../controllers/googleauth/google-auth'

const router = express.Router()

router.post('/login',googleLogin)
router.post('/signup',googleSignup)


export default router