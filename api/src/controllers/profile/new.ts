import {Request, Response} from 'express';
import pool from '../../config/db';


export const Onboard = async (req:Request, res:Response ) => {
        const { describesYou,workYoudo,country,stack,goals} = req.body
        
        try{
        //check if user already has a profile
        const checkq = "SELECT * FROM profile WHERE user_id = $1"
        const {rows:checkedprofile} = await pool.query(checkq,[req.user?.id])
        if (checkedprofile.length === 0){
        const q = "INSERT INTO profile (describesyou,workyoudo,country,stack,goals,user_id) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *"
        const {rows} = await pool.query(q,[describesYou,workYoudo,country,stack,goals,req.user?.id])
        res.send(rows[0])
        return
        }else{
            const query = `
                    UPDATE profile
                    SET 
                        describesyou = $1,
                        workyoudo = $2,
                        country = $3,
                        stack = $4,
                        goals = $5
                        WHERE user_id = $6
                        RETURNING *
                    `;

        const {rows:updatedProfile} = await pool.query(query,[describesYou, workYoudo, country, stack, goals, req.user?.id])
        res.send(updatedProfile[0])
        }
        }catch(error){
            console.log(error)
        }
}