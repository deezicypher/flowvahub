import  {Request, Response} from 'express'
import { validationResult } from 'express-validator';
import pool from '../../config/db';
import { generateActiveToken } from '../../utils/generateToken';
import { ResetPass } from '../../utils/sendMail';

const CLIENT_URL = `${process.env.CLIENT_URL}`

export const forgetPassword = async (req:Request, res:Response):Promise<void> => {
 
    const {email} = req.body;

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const firstError = errors.array().map(err => err.msg)[0]
      
      res.status(422).json({error:firstError})
      return;
    }
  try{
    // check if user exists
    const q = "SELECT * FROM users WHERE email = $1"
  
    // use await to wait for the result of the query
    const {rows} = await pool.query(q,[email.toLowerCase()])
    if(rows.length === 0) {
       res.status(404).json({error:"Account not found"})
       return
    }
    const user = rows[0]
  
    // create active token with user id
    const active_token = generateActiveToken({id:user.id})
    // generate activation url
  
    const url = `${CLIENT_URL}/reset-password?token=${active_token}`
    console.log(url)
    // Send Email
    ResetPass(email,url,"Reset Password",res, email)
    return
  
  }catch(err:any){
    console.log(err)
    res.status(500).json({error: "Unable to proceed further at the moment"})
    return
  }
  }