import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/reset-password' element={<ResetPass/>} />
    <Route path="/forgot-password" element={<ForgotPass />} />

    </Routes>
    </>
  )
}

export default App
