export  interface User{
  id:string;
  name:string;
  email:string;
  password:string;
  hashedPass:string;
  role?: string;
}
declare global{
  namespace Express {
      interface Request {
          user?: User
      }
  }
}
export interface DecodedToken {
    id?:string;
    user:User;
    iat:number;
    exp:number;
}