import React, {createContext, useContext , useState} from 'react';
import {  useMutation } from '@tanstack/react-query';
import { AuthContextProps, LoginFormData, ResetPassProps, SignupFormData, } from '../types';
import { useNavigate } from 'react-router-dom';
import { postAPI } from '../utils/fetchData';


const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthContextProvider = ({children}:{children:React.ReactNode})=>{
    const navigate = useNavigate()
    const [user, setUser] = useState<Record<string,unknown>>({})
    const [notify, setNotify] = useState<{ state: boolean; msg: string; error?:boolean }>({
        state: false,
        msg: '',
        error:false
      });

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
                setNotify({state:true,msg:userFriendlyMessage,error:true})
                setTimeout(() => {
                    setNotify({state:false,msg:'',error:false})
                }, 3000);
          },
        },
      );

    const signup = useMutation({
        mutationFn: async (data : SignupFormData) => {

           const res = await postAPI('users/signup',data);
           return res.data
  
       },
         onSuccess: async () => {
           
         },
         onError: async (error:any) => {
            const fallbackMessage = 'Something went wrong. Please try again.';

            const userFriendlyMessage =
                error?.response?.data?.error ||                 
                fallbackMessage;                 
                setNotify({state:true,msg:userFriendlyMessage,error:true})
                setTimeout(() => {
                    setNotify({state:false,msg:'',error:false})
                }, 3000);
           console.error('Signup error:', error);
         }
       }
     )

     const sendPass = useMutation({
        mutationFn: async (forgotEmail:string) => {
          
            const res = await postAPI('users/forgot-password', { forgotEmail });
            return res.data;
     
        },
          onError: (error:any) => {
            
            console.error('Forgot Pass error:', error);
            const fallbackMessage = 'Something went wrong. Please try again.';

            const userFriendlyMessage =
                error?.response?.data?.error ||                 
                fallbackMessage;                 
                setNotify({state:true,msg:userFriendlyMessage,error:true})
                setTimeout(() => {
                    setNotify({state:false,msg:'',error:false})
                }, 3000);
    
          },
        }
      );

      const resetPass = useMutation({
        mutationFn: async (data:ResetPassProps) => {
          const { password,token } = data;
            console.log(data)
          const res = await postAPI('users/reset-password', {
            password: password,
            token: token,
          });
          return res.data;
    
        },
        
      
          onSuccess: () => {
            setTimeout(() => {
                navigate('/signin');
              }, 2000);
          },
          onError: (error:any) => {
            const fallbackMessage = 'Something went wrong. Please try again.';
            const userFriendlyMessage =
                error?.response?.data?.error ||                 
                fallbackMessage;                 
                setNotify({state:true,msg:userFriendlyMessage,error:true})
                setTimeout(() => {
                    setNotify({state:false,msg:'',error:false})
                }, 3000);
              console.log(error)
          },
        }
      );
      return (
        <AuthContext.Provider value={{login,user,setUser, signup, sendPass, notify, setNotify, resetPass}}>
            {children}
        </AuthContext.Provider>
      )

}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if(!context) throw Error ("useAuthContext must be used within an AuthContextProvider");
  return context;
}