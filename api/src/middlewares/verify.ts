import { Response ,Request,  NextFunction} from 'express';
import jwt from 'jsonwebtoken'


export const verifyToken = (req:Request, res:Response, next:NextFunction):void => {
  
    const token = req.session?.accesstoken;
    if(!token) {
    res.status(401).json({msg:"You're not authenticated"})
    return
    }

    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err: any, user:any) => {
      if (err) {

        return res.status(403).json({error:'Token is not valid'});
      }
      req.user = user;
    
      next();
    });
}

