import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartState } from "../Context";
import swal from "sweetalert";

const SERVER_URL = "http://localhost:4000";

const Logout = () => {
  const navigate = useNavigate();
  const { state, dispatch, dispatch_T, setUser, setTeacher } = CartState();
  //   try {
  // axios({
  //   method: "GET",
  //   url: `${SERVER_URL}/api/user/logout`,
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8",
  //   },
  // }).then((res) => {
  //   dispatch({ type: "USER", payload: false });
  //   navigate("/login");
  //   if (res.status === 200) {
  //   }
  // });
  //   } catch (err) {
  //     console.log(err.toString());
  //   }
  // };
  // useEffect(() => {
  axios
    .post(`${SERVER_URL}/api/user/logout`, { credentials: "include" })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        console.log("Logout Success!!!!!!!!!!!");
        dispatch({ type: "USER", payload: false });
        setUser({});
        dispatch_T({ type: "TEACHER", payload: false });
        setTeacher({});
        navigate("/login", { replace: true });
        Swal.fire("You've been successfully Logged Out!!!");
      }
      // if (res.status !== 200) {
      //   throw new Error();
      // }
    })
    .catch((err) => {
      console.log("Error in Logout : " + err.toString());
    });
  // });
  return (
    <>
      <center>
        <h1>Logout Success!!</h1>
      </center>
    </>
  );
};

export default Logout;
