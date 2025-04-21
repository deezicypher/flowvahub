import  { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation } from 'react-router-dom'
import Section from '../components/section'
import { useAuthContext } from '../context/AuthContext'
import { ResetPassProps } from '../types'

const ResetPass = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

     const {resetPass,notify,setNotify} = useAuthContext()
         const [showPassword, setShowPassword] = useState(false);
         const [showPassword2, setShowPassword2] = useState(false);
     
       const togglePassword = () => setShowPassword(prev => !prev);
      
       const togglePassword2 = () => setShowPassword2(prev => !prev);

       const { register, handleSubmit, watch } = useForm<ResetPassProps>();
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

  const onSubmit = async (data:ResetPassProps) => {
      if(data.password.length < 8) {
          setNotify({state:true,msg:'Password must be at least 8 characters',error:true})
          setTimeout(() => {
              setNotify({state:false,msg:'',error:false})
          }, 5000);
          return
      }
      if(data.password !== data.password2) {
          setNotify({state:true,msg:'Passwords do not match',error:true})
          setTimeout(() => {
              setNotify({state:false,msg:'',error:false})
          }, 5000);
          return
      }
      
      resetPass.mutate({...data,token: token ?? undefined})
    
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


<div className='text-2xl text-gray-700 font-semibold mb-8'>Reset your password</div>


</div>
   <form className="sm:mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)} >
  
     <div className="-space-y-px flex flex-col  gap-5 rounded-md ">
     
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
           id="password2"
           type={showPassword2 ? 'text' : 'password'}
           {...register('password2')}
           autoComplete="current-password"
           required
           className="relative block w-full appearance-none  bg-gray-50  rounded-xl border  mt-2  border-gray-300 px-[16px] py-[10px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-bold placeholder-text-2xl focus:z-10 focus:border-primary focus:outline-none focus:bg-white focus:shadow-custom-focus  sm:text-sm "
           placeholder="••••••••"
         />
         <span className='absolute right-4 top-11 cursor-pointer text-sm' onClick={togglePassword2}>Show</span>
       </div>
     </div>



     <div>
       <button
         type="submit"
         className="group login-btn mt-8 relative flex w-full justify-center items-center rounded-xl gap-2 bg-primary p-[14px] text-white  focus:outline-none  cursor-pointer "
       >
         

         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>



         <div className='font-semibold text-base'>Reset Password</div>


       </button>
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

export default ResetPass