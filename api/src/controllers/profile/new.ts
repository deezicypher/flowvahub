import {Request, Response} from 'express';
import pool from '../../config/db';


export const Onboard = async (req:Request, res:Response ) => {
        const { describesYou,workYoudo,country,stack,goals} = req.body
        
        try{
        const q = "INSERT INTO profile (describesYou,workYoudo,country,stack,goals) VALUES ($1, $2, $3, $4, $5) RETURNING *"
        const {rows} = await pool.query(q,[describesYou,workYoudo,country,stack,goals])
        res.send(rows[0])
        return
        }catch(error){
            console.log(error)
        }
}