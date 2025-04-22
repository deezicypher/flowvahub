import express,{NextFunction, Request, Response} from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors';
import userRoute from './routes/user'
import ProfileRoute from './routes/profile'
import pool from './config/db'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's origin
  credentials: true // Allow cookies to be sent cross-origin
}));
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== 'test'
  }))

  app.use('/api/users', userRoute)
  app.use('/api/profile', ProfileRoute)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}); 

const connectDB = async () => {
  try {
    await pool.connect()
    console.log("Connected to DB")
    await pool.query(`CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "email" varchar NOT NULL,
      "password" varchar NOT NULL,
      "created_at" timestamptz NOT NULL DEFAULT (now())
    );
       CREATE TABLE IF NOT EXISTS "profile" (
      "id" SERIAL PRIMARY KEY,
      "describesyou" text NOT NULL,
      "workyoudo" text[] NOT NULL,
      "country" varchar,
      "stack" text[],
      "goals" text[]
    ) 
    `);
    console.log("Created Table users and profile")
  }catch (err:any) {
    console.error("Error connecting to DB:", err.message); 
    process.exit(1); 
  }

}
  app.listen(3000,() => {
    connectDB()
    console.log('Listening on port 3000')
  })