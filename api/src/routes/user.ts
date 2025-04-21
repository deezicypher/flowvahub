import express from 'express'
import { forgotPasswordValidator, resetPasswordValidator, validLogin, validSignup } from '../middlewares/validators'
import { signin } from '../controllers/user/login'
import { signup } from '../controllers/user/signup'
import { ResetPassword } from '../controllers/user/reset-pass'
import { forgetPassword } from '../controllers/user/forgot-pass'

const router = express.Router()


router.post('/signup',validSignup,signup)
router.post('/signin',validLogin, signin)
router.post('/forgot-password',forgotPasswordValidator, forgetPassword)
router.post('/reset-password',resetPasswordValidator, ResetPassword)

export default router