import React, { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CartState } from "../Context";
// import { CartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
const SERVER_URL = "http://localhost:4000";

const Navbar = () => {
  const navigate = useNavigate();
  const { state, state_T, dispatch, dispatch_T } = CartState();
  //{logout}
  // const [state] = useContext(CartContext);

  // useEffect(() => {
  //   console.log("WSFSDFDMN");
  //   const isLogin = localStorage.getItem("LoggedInUSer")
  //     ? JSON.parse(localStorage.getItem("LoggedInUser"))
  //     : [];
  //   dispatch({ type: "USER", payload: isLogin });
  // }, []);

  const logout = () => {
    axios
      .post(`${SERVER_URL}/api/user/logout`, { credentials: "include" })
      .then((res) => {
        if (res.status === 200) {
          // throw new Error();
          localStorage.clear();
          dispatch({ type: "USER", payload: false });
          dispatch_T({ type: "TEACHER", payload: false });
          navigate("/login", { replace: true });
          Swal.fire("You've been successfully Logged Out!!!");
        }
      })
      .catch((err) => {
        console.log("Error in Logout : " + err.toString());
      });
  };

  const RenderCourse = () => {
    if (state_T) {
      return (
        <>
          <Link to="/addcourse">
            <h5>ADD COURSES</h5>
          </Link>
          <Link to="/doubts">
            <h5>DOUBTS</h5>
          </Link>
          <Link to="/faq">
            <h5>SHOW COURSE</h5>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/buy">
            <h5>BUY COURSES</h5>
          </Link>
          <Link to="/about">
            <h5>ABOUT US</h5>
          </Link>
        </>
      );
    }
  };

  const RenderMenu = () => {
    if (state || state_T) {
      return (
        <Link to="">
          <button className="btn-login" onClick={logout}>
            Logout
          </button>
        </Link>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-signup">Sign Up</button>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="nav-bar row">
      <div className="nav-logo col-xl-3 col-lg-3 col-md-3 col-xs-12 col-12">
        <h3>eLearning</h3>
      </div>
      <div className="nav-links col-xl-6 col-lg-6 col-md-6 col-xs-12 col-12">
        {/* -----------------------Toggling Teacher/User here----------------- */}

        <RenderCourse />

        {/* ----------------------------------------------------------------- */}

        {/* <Link to="/docs">
          <h5>DOCS</h5>
        </Link> */}
        {/* <Link to="/faq">
          <h5>FAQ</h5>
        </Link> */}
        {/* -----------------Toggling Login Here */}
        <RenderMenu />
        {/* ------------------------------------ */}
      </div>
      <div className="cart-profile col-xl-3 col-lg-3 col-md-3 col-xs-12 col-12">
        <Link to="/cart">
          <FiShoppingCart />
          {/* <p>Cart Count : {state.length}</p> */}
        </Link>
        {state || state_T ? (
          <Link to="/profile">
            <HiOutlineUserCircle />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
