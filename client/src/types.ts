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
export interface AuthContextProps {
  login: UseMutationResult<any,any,LoginFormData,unknown>;
  user: User,
  error:string | undefined
  setUser: Dispatch<SetStateAction<User>>;
}