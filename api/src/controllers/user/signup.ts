import  {Request, Response} from 'express';
import {validationResult} from 'express-validator'
import pool from '../../config/db';
import bcrypt from 'bcrypt'

export const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      res.status(422).json({ error: firstError });
      return 
    }
  
    const { email, password } = req.body;
   
    // Normalize input and trim whitespace
    const normalizedEmail = email.toLowerCase().trim();
  
    try {
      // Check if the email or name already exists in the database
      const query = "SELECT * FROM users WHERE email = $1";
      // Use await to wait for the result of the query, ensures that the query is executed and completes before proceeding.
      const { rows } = await pool.query(query, [normalizedEmail]);
  
   // If user is found, check if the email or name already exists
   if (rows.length > 0) {
    const user = rows[0];
    
    if (user.email === normalizedEmail) {
       res.status(422).json({ error: "Email already exists" });
       return
    }
  

  }
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPass = bcrypt.hashSync(password, salt);
  
      
      // Prepare the query to save the user in the database
      const saveQuery = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';

      // Use await to run the query and handle the response
      const result = await pool.query(saveQuery, [normalizedEmail, hashedPass]);
  
      const { id, created_at} = result.rows[0]
      // Respond with a success message and the created user
     res.json({ msg: 'Account created successfully! Welcome to Flowva.', user: {id,email,created_at} });

     return
    
      
    } catch (err: any) {
      console.error(err);
     res.status(500).json({ error: "Unable to proceed further at the moment" });
     return 
    }
  };