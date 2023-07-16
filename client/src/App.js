import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages";
import About from "./pages/About";
import Buy from "./pages/Buy";
import Docs from "./pages/Docs";
import Faq from "./pages/Faq";
import Cart from "./pages/My_Cart/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import LoginT from "./pages/LoginT";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import RegisterT from "./pages/RegisterT";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpCode from "./pages/OtpCode";
import NotFound from "./pages/NotFound";
import AddCourses from "./pages/AddCourses";
import Doubts from "./pages/Doubts";

import { initialState, reducer } from "./pages/Reducer/UseReducer.js";
import SingleCourse from "./pages/My_Cart/SingleCourse";

function App() {
  // const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  // const user = useContext(cart);
  // useEffect(() => {
  // if(loggedIn) {

  // }
  // });

  // const [isLoggeddIn, setIsLoggeddIn] = useState(false);
  // const auth = useAuth();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/about" element={<About />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loginT" element={<LoginT />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tsignup" element={<RegisterT />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:email" element={<ResetPassword />} />
        <Route path="/otpcode/:email" element={<OtpCode />} />
        <Route path="/addcourse" element={<AddCourses />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path="/single" element={<SingleCourse />} />
        {/* <Route path="/profile" element={<PrivateRoute />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
