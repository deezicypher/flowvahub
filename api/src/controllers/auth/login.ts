import {Request,Response} from 'express'
import {validationResult} from 'express-validator'
import pool from '../../config/db';
import bcrypt from 'bcrypt'
import { generateAccessToken } from '../../utils/generateToken';

export const signin = async (req:Request, res:Response) => {
    const {email,password} = req.body
    const errors = validationResult(req);
  
     
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      res.status(422).json({
        error: firstError,
      });
      return;
    }
   
    try{
      // check if the user exists
      const q = "SELECT * FROM users WHERE email ILIKE $1"
  
      // use await to wait for the result of the query
      const {rows} = await pool.query(q,[email])
  
  
      if(rows.length === 0) {
       res.status(422).json({error:"Invalid Email"})
       return
      }
  
      const user = rows[0]
  
      // check and compare password
        const checkPassword = bcrypt.compareSync(password,user.password)
        if(!checkPassword) {
           res.status(401).json({error: "Invalid Password"})
          return
        }
        // generate access token
  
        generateAccessToken({id:user.id},req)
        
       res.json({user: { id:user?.id,name:user?.name,email:user?.email,}})
      return
      
    } catch(err:any){
      console.log(err)
      res.status(500).json({error: "Unable to proceed further at the moment"})
      return
    }
  }