import Navbar from "./components/user/Navbar";
import "./index.css";
import SignIn from "./components/user/auth/SignIn";
import SignUp from "./components/user/auth/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./components/user/Home";
import EmailVerification from "./components/user/auth/EmailVerification";
import ForgetPassword from "./components/user/auth/ForgetPassword";
import ConfirmPassword from "./components/user/auth/ConfirmPassword";
import NotFound from "./components/user/NotFound";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/forget-password" element={<ForgetPassword />} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/confirm-password" element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
