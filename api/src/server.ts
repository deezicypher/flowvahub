import express,{NextFunction, Request, Response} from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors';
import userRoute from './routes/user'
import ProfileRoute from './routes/profile'
import GoogleRoute from './routes/google'
import pool from './config/db'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000; 
app.set('trust proxy', true)
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL , 
  credentials: true 
}));
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV === 'prod',
    sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax',
  }))

 app.use(express.static(path.join(__dirname, './client')))

  app.use('/api/users', userRoute)
  app.use('/api/profile', ProfileRoute)
  app.use('/api/google', GoogleRoute)
 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}); 

app.get(/(.*)/, (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './client/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

 

const connectDB = async () => {
  try {
    await pool.connect()
    console.log("Connected to DB")
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email varchar NOT NULL,
      password varchar NOT NULL,
      created_at timestamptz NOT NULL DEFAULT (now())
    );
       CREATE TABLE IF NOT EXISTS profile (
      id SERIAL PRIMARY KEY,
      describesyou text NOT NULL,
      workyoudo text[] NOT NULL,
      country varchar,
      stack text[],
      goals text[],
      user_id INTEGER NOT NULL
    ) 
    `);
    console.log("Created Table users and profile")
  }catch (err:any) {
    console.error("Error connecting to DB:", err.message); 
    process.exit(1); 
  }

}
  app.listen(port,() => {
    connectDB()
    console.log('Listening on port 3000')
  })