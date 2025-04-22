import React, {createContext, useContext , useEffect, useState} from 'react';
import {  useMutation } from '@tanstack/react-query';
import { AuthContextProps, LoginFormData, ResetPassProps, SignupFormData, } from '../types';
import { useNavigate } from 'react-router-dom';
import { getAPI, postAPI } from '../utils/fetchData';


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
           

            const res = await postAPI('users/signin', data);
            return res.data;
   
     
        },
        onMutate: () => {
            setNotify({state:true,msg:'Signing in...'});
        },
          onSuccess: async (data) => {
            setUser(data.user)
            setTimeout(() => {
              setNotify({state:true,msg:'Welcome back! Redirecting...'});
              setTimeout(()=>{
                setNotify({state:false,msg:''})
                return navigate('/Onboard')
              },2000)
            }, 2000);
                
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
            console.log(data)

           const res = await postAPI('users/signup',data);
           return res.data
  
       },
       onMutate: () => {
        setNotify({state:true,msg:'Creating your account...'})
       },
         onSuccess: async (data) => {
          setUser(data.user)
            setTimeout(() => {
                setNotify({msg:data.msg, state:true})
                setTimeout(()=>{
                  setNotify({state:false,msg:''})
                  return navigate('/Onboard')
                },2000)
              }, 2000);
        
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

     const forgotPass = useMutation({
        mutationFn: async (forgotEmail:string) => {
          
            const res = await postAPI('users/forgot-password', { email:forgotEmail });
            return res.data;
     
        },
        onMutate: () => {
            setNotify({state:true,msg:'Sending reset link...'});
            
          },
          onSuccess: (data) => {
            setNotify({state:true,msg:data.msg});
            setTimeout(() => {
                setNotify({state:false,msg:'',error:false})
            }, 2000);
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
            
          const res = await postAPI('users/reset-password', {
            password: password,
            token: token,
          });
          return res.data;
    
        },
        onMutate: () => {
            setNotify({state:true,msg:'Resetting your password...'})
            
        },
        
          onSuccess: (data) => {
            
            setTimeout(() => {
                setNotify({state:true,msg:data.msg});
                setTimeout(() => {
                    setNotify({state:false,msg:'',error:false})
                    navigate('/signin')
                },2000)
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

      const authCheckState = useMutation({
        mutationFn: async() => {
          const res = await getAPI('users/currentuser')
          return res.data
        },
        onSuccess:(data)=>{
          setUser(data.user)
        },
        onError:(error:any) => {
          console.log(error)
        }
      })
      
      useEffect(() => {
        authCheckState.mutate();
      }, []);
      return (
        <AuthContext.Provider value={{login,user,setUser, signup, forgotPass, notify, setNotify, resetPass}}>
            {children}
        </AuthContext.Provider>
      )

}

export function useAuthContext() {
    const context = useContext(AuthContext)
    if(!context) throw Error ("useAuthContext must be used within an AuthContextProvider");
  return context;
}