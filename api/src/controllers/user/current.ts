import {Request, Response} from 'express';
import pool from '../../config/db';


export const currentUser = async (req:Request, res:Response) => {
    const {user} = req
    
    try{
      // get user query
      const q = "SELECT * FROM users WHERE id = $1"
   // use await to wait for the result of the query
      const {rows} = await pool.query(q,[user?.id])
      if(rows.length === 0 ){
        res.status(404).json({error: "User not found"})
        return
      }
  
      res.json({user:rows[0]})
      return
    }catch(err) {
      console.log(err)
      res.status(500).json("Unable to proceed further at the moment")
    }
  };