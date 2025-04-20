import {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import Section from '../components/section'
import { LoginFormData } from '../types'





const Login = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')

  const { register, handleSubmit, setValue } = useForm<LoginFormData>();

  const onSubmit = async (data:LoginFormData,) => {
    setIsLoading(true)

  

  };
 



  return (
    <div>
    <Section  className='relative px-4 h-screen'>

<div className='bg-white p-10 max-w-[420px] w-full rounded-xl shadow-2xl'>
<div  className='flex items-center flex-col'>
<div onClick={() => window.location.href="/"} className='text-primary flex justify-center items-center gap-2'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 mt-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
</svg>


                <div  className="font-rubik font-bold text-center mt-10 text-2xl no-underline  text-primary mb-8">

Flowva
</div>
</div>
<div className='text-2xl text-gray-700 font-semibold mb-8'>Welcome back</div>


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
           className="w-full bg-gray-50 rounded-xl border mt-2 border-gray-300 px-[14px] py-[16px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-extralight focus:z-10 focus:!border-[#7C4DFF] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-white focus:shadow-custom-focus sm:text-sm appearance-none"
           
           placeholder="you@example.com"
         />
       </div> 
       <div className='relative'>
         <label htmlFor="password" className="text-gray-700 font-medium text-sm">
           Password
         </label>
         <input
           id="password"
           type="password"
           {...register('password')}
           autoComplete="current-password"
           required
           className="relative block w-full appearance-none  bg-gray-50  rounded-xl border  mt-2  border-gray-300 px-[16px] py-[14px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-bold placeholder-text-2xl focus:z-10 focus:border-primary focus:outline-none focus:bg-white focus:shadow-custom-focus  sm:text-sm "
           placeholder="••••••••"
         />
         <span className='absolute right-4 top-11 cursor-pointer text-sm'>Show</span>
       </div>
     </div>

     <div className="flex gap-5 items-center justify-between mt-8">


     <div className="ml-auto mb-8">
  <Link to="#" className="forgot text-[13px] font-medium text-gray-600 ">
    Forgot password?
  </Link>
</div>
     </div>

     <div>
       <button
         type="submit"
         className="group login-btn relative flex w-full justify-center items-center rounded-xl gap-2 bg-primary p-[14px] text-white font-poppins focus:outline-none  cursor-pointer "
       >
         

       
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>


         <div className='font-medium text-base'>Sign in</div>


       </button>
     </div>
     <div className='flex flex-col justify-center items-center mt-2'>
       
        <div className="flex items-center w-full text-gray-500 text-sm my-4">
  <div className="flex-grow border-t border-gray-300"></div>
  <div className='text-xs font-medium '>or continue with</div>
  <div className="flex-grow border-t border-gray-300"></div>
</div>

<div className='border rounded-xl p-3.5 w-full text-center'>Google</div>

     </div>
     <div className=" text-center font-medium text-sm mt-6">
       Don't have an account? {' '}
       <Link to="/signup" className="font-semibold text-primary">
         Signup
       </Link>
     </div>
   </form>
   </div>
 </Section>
 </div>
 

  )
}

export default Login


