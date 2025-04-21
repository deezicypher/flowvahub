import express from 'express'
import { forgotPasswordValidator, resetPasswordValidator, validLogin, validSignup } from '../middlewares/validators'
import { signin } from '../controllers/user/login'
import { signup } from '../controllers/user/signup'
import { ResetPassword } from '../controllers/user/reset-pass'
import { forgetPassword } from '../controllers/user/forgot-pass'

const router = express.Router()


router.post('/signup',validSignup,signup)
router.post('/signin',validLogin, signin)
router.post('/forgotpassword',forgotPasswordValidator, forgetPassword)
router.post('/resetpassword',resetPasswordValidator, ResetPassword)

export default router