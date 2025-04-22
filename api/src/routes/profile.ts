import express from 'express'
import { verifyToken } from '../middlewares/verify'

const router = express.Router()

router.post('/onboard', verifyToken)

export default router