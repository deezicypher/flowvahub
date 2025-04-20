import { UseMutationResult } from '@tanstack/react-query'; 
import { Dispatch, SetStateAction } from 'react';

 

export interface LoginFormData {
  email: string;
  password: string;
}


export interface SignupFormData {
  [key:string] : any;
}
export interface User {
  [key: string] :any;
}
export interface Notify{
  state: boolean; 
  msg: string; 
  error?:boolean
}
export interface AuthContextProps {
  login: UseMutationResult<any,any,LoginFormData,unknown>;
  signup: UseMutationResult<any,any,SignupFormData,unknown>;
  sendPass: UseMutationResult<any,any,string,unknown>;
  user: User;
  notify: Notify;
  setNotify:Dispatch<SetStateAction<Notify>>
  setUser: Dispatch<SetStateAction<User>>;
}