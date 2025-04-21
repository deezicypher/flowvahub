import {useEffect, useState } from 'react'
import Section from '../components/section'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'


const ForgotPass = () => {
  const [email, setEmail] = useState<string>('')
  const {sendPass,notify,setNotify} = useAuthContext()


  const onSubmit = async (e:any) => { 
   
   e.preventDefault()  
   sendPass.mutate(email)
  }

    useEffect(() => {
      if (sendPass.isSuccess) {
        setNotify({state:true,msg:'Reset link sent to your email.'});
          
          setTimeout(() => {
            setNotify({state:false,msg:''})
          }, 3000);
      }
    }, [sendPass.isSuccess]);

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
      <form className="sm:mt-10 space-y-6" onSubmit={(onSubmit)} >
     
        <div className="-space-y-px flex flex-col  gap-5 rounded-md ">
        
          <div >
            <label htmlFor="email-address" className="text-gray-700 font-medium text-sm">
              Email 
            </label>
            <input
              id="email-address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-gray-50 rounded-xl border mt-2 border-gray-300 px-[16px] py-[10px] text-gray-900 font-medium placeholder-gray-400 placeholder-font-extralight focus:z-10 focus:!border-[#7C4DFF] focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-white focus:shadow-custom-focus sm:text-sm appearance-none"
              
              placeholder="you@example.com"
            />
          </div> 
      
        </div>
   
  
   
        <div>
          <button
            type="submit"
            className="group mt-8 login-btn relative flex w-full justify-center items-center rounded-xl gap-2 bg-primary p-[14px] text-white font-poppins focus:outline-none  cursor-pointer "
          >
            
   
          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

   
   
            <div className='font-medium text-base'>Send reset link</div>
   
   
          </button>
        </div>
     
        <div className="flex justify-center items-center gap-2 text-center font-medium text-sm mt-6">
        Remember your password? {' '}
          <Link to="/signin" className="font-semibold text-primary cursor-pointer">
            Signin
          </Link>
        </div>
      </form>
      </div>
    </Section>
    </div>
  )
}

export default ForgotPass