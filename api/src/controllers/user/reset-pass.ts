import {Request, Response} from 'express'
import { DecodedToken } from '../../types';
import Jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import pool from '../../config/db';
dotenv.config()


export const ResetPassword = async (req:Request, res:Response) => {
    try{
      const {token,password} = req.body
      // declare decoded variable of type DecodedToken
      let decoded : DecodedToken;
  
      // Try to verify token and assign the result to decoded variable
        decoded = <DecodedToken>Jwt.verify(token,`${process.env.ACTIVE_TOKEN_SECRET}`)
   
        // get id from decoded
      const {id} = decoded
  
      if(!id) {
        res.status(401).json({error: "Invalid Authentication"})
        return;
      } 
  
      //Hash the password
      const salt = bcrypt.genSaltSync(10)
      const hashedPass = bcrypt.hashSync(password, salt)
  
      //Update user password query
      const q = 'UPDATE users SET password = $1 WHERE id = $2 '
  
      // use await to wait for the result of the query
       await pool.query(q,[hashedPass,id])
       res.json({msg: "Password Reset Successful. Redirecting..."})
       return;
    }catch(err:any) {
      console.log(err)
      res.status(500).json({error: "Token might have expired."})
      return
    }
  }