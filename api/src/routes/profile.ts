import express from 'express'
import { verifyToken } from '../middlewares/verify'
import { Onboard } from '../controllers/profile/new'

const router = express.Router()

router.post('/onboard', verifyToken,Onboard)

export default router