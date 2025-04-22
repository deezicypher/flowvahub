import {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import Section from '../components/section'
import {  SignupFormData } from '../types'
import { useAuthContext } from '../context/AuthContext'
import { useGoogleLogin } from '@react-oauth/google';
import { postAPI } from '../utils/fetchData'



const Signup = () => {
    const {setUser} = useAuthContext()
    const navigate = useNavigate()

    const {signup,notify,setNotify} = useAuthContext()
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);
 
  const togglePassword2 = () => setShowPassword2(prev => !prev);


  
 const { register, handleSubmit, watch } = useForm();
 const password = watch('password') || ''

 const getStrengthInfo = () => {
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { color: 'bg-[#4CAF50]', width: '100%' }; // Strong
    } else if (password.length >= 6) {
      return { color: 'bg-[#FFC107]', width: '66%' }; // Medium
    } else if (password.length > 0) {
      return { color: 'bg-[#FF5252]', width: '33%' }; // Weak
    } else {
      return { color: 'bg-gray-200', width: '0%' }; // Empty
    }
  };
 
  const onSubmit =   (data:SignupFormData) => {
    if(data.password.length < 8) {
        setNotify({state:true,msg:'Password must be at least 8 characters',error:true})
        setTimeout(() => {
            setNotify({state:false,msg:'',error:false})
        }, 5000);
        return
    }
    if(data.password !== data.confirmpassword) {
        setNotify({state:true,msg:'Passwords do not match',error:true})
        setTimeout(() => {
            setNotify({state:false,msg:'',error:false})
        }, 5000);
        return
    }
    
    signup.mutate(data)
  
  }
  const Glogin = useGoogleLogin({      
    onSuccess: async tokenResponse => {
        const {access_token} = tokenResponse;
        
        try {
            const userInfo = await postAPI('google/signup',{access_token})
            const {email, id} = userInfo.data.user;
            const doc = {email,id}
        
            setUser(doc)
            setTimeout(() => {
              setNotify({state:true,msg:'Signup Successful! Redirecting...'});
              setTimeout(()=>{
                setNotify({state:false,msg:''})
                return navigate('/Onboard')
              },2000)
            }, 2000);

        } catch (error:any) {
            console.log(error)
            const fallbackMessage = 'Something went wrong. Please try again.';

            const userFriendlyMessage =
                error?.response?.data?.error ||                 
                fallbackMessage;                 
                setNotify({state:true,msg:userFriendlyMessage,error:true})
                setTimeout(() => {
                    setNotify({state:false,msg:'',error:false})
                }, 5000);
        }
        
           
    },
  });

  const callGlogin = () => {
    setNotify({msg:'Redirecting to Google...', state:true})
    Glogin()
    setTimeout(() => {
        setNotify({msg:'',state:false})
    }, 5000);
  }
 
  

  

  const { color, width } = getStrengthInfo();

  return (
    <div>
    <Section  className='relative px-4 h-screen'>

<div className='relative bg-white p-10 max-w-[420px] w-full rounded-xl shadow-2xl'>
<div className='container-bg h-2 absolute w-full top-0 left-0 rounded-t-xl'>{" "}</div>
<div  className='flex items-center flex-col'>
<div onClick={() => window.location.href="/"} className='text-primary flex justify-center items-center gap-2'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 mt-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
</svg>


                <div  className="font-rubik font-bold text-center mt-10 text-2xl no-underline  text-primary mb-8">

Flowva
</div>
</div>


{notify.state &&
<div className={`flex w-full rounded-xl p-3 mb-5 text-sm ${!notify.error? 'success-msg text-success border-l-4 border-l-success':''} ${notify.error ? 'error-msg text-error border-l-4 border-l-error':''}`}>
    {notify.msg}
</div>
}


<div className='text-2xl text-gray-700 font-semibold mb-8'>Join Flowva today</div>


</div>
   <form className="sm:mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)} >
  
     <div className="-space-y-px flex flex-col  gap-5 rounded-md ">
     
       <div >
         <label htmlFor="email-address" className="text-gray-700 font-medium text-sm">
           Email 
         </label>
         <input
           id="email-address"
           type="email"
           autoComplete="email"
           {...register('email')}
           required
           className="w-full bg-gray-50 rounded-xl border mt-2 border-gray-300 px-[16px] py-[10px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-extralight focus:z-10 focus:!border-[#7C4DFF] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-white focus:shadow-custom-focus sm:text-sm appearance-none"
           
           placeholder="you@example.com"
         />
       </div> 
       <div className='relative'>
         <label htmlFor="password" className="text-gray-700 font-medium text-sm">
           Password
         </label>
         <input
           id="password"
           type={showPassword ? 'text' : 'password'}
           {...register('password')}
           autoComplete="current-password"
           required
           className="relative block w-full appearance-none  bg-gray-50  rounded-xl border  mt-2  border-gray-300 px-[16px] py-[10px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-bold placeholder-text-2xl focus:z-10 focus:border-primary focus:outline-none focus:bg-white focus:shadow-custom-focus  sm:text-sm "
           placeholder="••••••••"
         />
         <span className='absolute right-4 top-11 cursor-pointer text-sm' onClick={togglePassword}>Show</span>
       </div>
       <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width }}
        />
      </div>
      <div className='text-xs text-gray-600'>Use at least 8 characters with a mix of letters, numbers & symbols</div>
       <div className='relative'>
         <label htmlFor="confirmpassword" className="text-gray-700 font-medium text-sm">
           Confirm Password
         </label>
         <input
           id="comfirmpassword"
           type={showPassword2 ? 'text' : 'password'}
           {...register('confirmpassword')}
           autoComplete="current-password"
           required
           className="relative block w-full appearance-none  bg-gray-50  rounded-xl border  mt-2  border-gray-300 px-[16px] py-[10px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-bold placeholder-text-2xl focus:z-10 focus:border-primary focus:outline-none focus:bg-white focus:shadow-custom-focus  sm:text-sm "
           placeholder="••••••••"
         />
         <span className='absolute right-4 top-11 cursor-pointer text-sm' onClick={togglePassword2}>Show</span>
       </div>
     </div>

     <div className="flex gap-5 items-center justify-between mt-8">


     <div className="ml-auto mb-8">
  <Link to="/forgot-password" className="forgot text-[13px] font-medium text-gray-600 ">
    Forgot password?
  </Link>
</div>
     </div>

     <div>
       <button
         type="submit"
         className="group login-btn relative flex w-full justify-center items-center rounded-xl gap-2 bg-primary p-[14px] text-white  focus:outline-none  cursor-pointer "
       >
         

         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>


         <div className='font-semibold text-base'>Create account</div>


       </button>
     </div>
     <div className='flex flex-col justify-center items-center mt-2'>
       
        <div className="flex items-center w-full text-gray-500 text-sm my-4">
  <div className="flex-grow border-t border-gray-300"></div>
  <div className='text-xs font-medium '>or continue with</div>
  <div className="flex-grow border-t border-gray-300"></div>
</div>

<div  onClick={() => callGlogin()} className='Gbtn flex cursor-pointer items-center justify-center gap-2 border border-gray-300 text-sm font-semibold rounded-xl p-3.5 w-full '><svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>Google</div>
 

     </div>
     <div className="flex justify-center items-center gap-2 text-center font-medium text-sm mt-6">
     Already have an account? {' '}
     <Link to="/signin" className="font-semibold text-primary cursor-pointer">
         Sign in
       </Link>
     </div>
   </form>
   </div>
 </Section>
 </div>
 

  )
}

export default Signup


