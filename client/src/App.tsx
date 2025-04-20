import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signin" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPass />} />
    </Routes>
    </>
  )
}

export default App
