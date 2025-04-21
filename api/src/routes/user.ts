import express from 'express'
import { forgotPasswordValidator, resetPasswordValidator, validLogin, validSignup } from '../middlewares/validators'
import { signin } from '../controllers/auth/login'
import { signup } from '../controllers/auth/signup'
import { ResetPassword } from '../controllers/auth/reset-pass'
import { forgetPassword } from '../controllers/auth/forgot-pass'

const router = express.Router()


router.post('/signup',validSignup,signup)
router.post('/signin',validLogin, signin)
router.post('/forgotpassword',forgotPasswordValidator, forgetPassword)
router.post('/resetpassword',resetPasswordValidator, ResetPassword)

export default router