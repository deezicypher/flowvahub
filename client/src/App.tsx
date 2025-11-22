import { Navigate, Route, Routes, } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import Onboard from "./pages/Onboard";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const {user} = useAuthContext()
  const authPaths = ['/', '/signin', '/signup', '/reset-password', '/forgot-password'];
  const isAuthRoute = authPaths.includes(location.pathname);

  const gradientBackground: React.CSSProperties = {
    background: 'linear-gradient(135deg, #EDE7F6 0%, #f5f5fa 100%)',
    minHeight: '100vh',
    width: '100%',
  };
 


  return (
    <>
    <div className='min-h-screen w-full flex items-center justify-center' style={isAuthRoute ? gradientBackground :{background:'#F5F6FA'} }>
   

    <Routes>
      {user?.id && 
      <Route path="/Onboard" element={<Onboard/>} />
}
    <Route path="/" element={<Login />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/reset-password' element={<ResetPass/>} />
    <Route path="/forgot-password" element={<ForgotPass />} />
    <Route path="*" element={<Navigate to="/" />} />
    </Routes>

    </div>
    </>
  )
}

export default App
