import express,{NextFunction, Request, Response} from 'express'
import cookieSession from 'cookie-session'

const app = express()
app.use(express.json())
app.use(cookieSession({
    signed:false,
    secure: process.env.NODE_ENV !== 'test'
  }))

  app.use('/api/users', (req:Request,res:Response)=> {
    res.send({})
  })
  
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
}); 
  app.listen(3000,() => {
    console.log('Listening on port 3000')
  })