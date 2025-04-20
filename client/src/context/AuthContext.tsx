import React, {createContext, useContext , useState} from 'react';
import {  useMutation } from '@tanstack/react-query';
import { AuthContextProps, LoginFormData, } from '../types';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../utils/fetchData';


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthContextProvider = ({children}:{children:React.ReactNode})=>{
    const navigate = useNavigate()
    const [user, setUser] = useState<Record<string,unknown>>({})
    const [error, setError] = useState<string|undefined>()

    const login = useMutation({
        mutationFn: async (data: LoginFormData) => {
            console.log(data)
       try{
            const res = await postAPI('users/signin', data);
            return res.data;
       }catch(err) {
        console.log(err)
       }
     
        },
          onSuccess: async (data) => {
            setUser(data.user)
                return navigate('/app')
            
          },
          onError: (error: any) => {
            console.error('Login error:', error);
            const fallbackMessage = 'Something went wrong. Please try again.';

            const userFriendlyMessage =
                error?.response?.data?.error ||                 
                fallbackMessage;                 
                setError(userFriendlyMessage);
          },
        },
      );

      return (
        <AuthContext.Provider value={{login,user,setUser,error}}>
            {children}
        </AuthContext.Provider>
      )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if(!context) throw Error ("useAuthContext must be used within an AuthContextProvider");
  return context;
}