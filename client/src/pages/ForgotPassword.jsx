import React, { useState } from "react";
import Swal from "sweetalert2";
import OtpCode from "./OtpCode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = "http://localhost:4000";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [resetEmail, setResetEmail] = useState("");

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);
    if (resetEmail === "") {
      Swal.fire("Please provide registered Email!");
    } else {
      alert(`Email sent to ${resetEmail}`);
      // console.log(`Email sent to ${resetEmail}`)
      navigate(`/OtpCode/${resetEmail}`);
    }
    await axios({
      method: "POST",
      url: `${SERVER_URL}/api/user/sendOtp`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      data: {
        _email: resetEmail,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.toString()));
    // console.log(data);
  };

  return (
    <body className="templatemo-bg-gray">
      <div className="container">
        <div className="col-md-12">
          <h1 className="margin-bottom-15">Password Reset</h1>
          <form
            className="form-horizontal templatemo-forgot-password-form templatemo-container"
            role="form"
            onSubmit={handleCodeSubmit}
          >
            <div className="form-group">
              <div className="col-md-12">
                Please enter your email address that you registered in our website.
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-6">
                <Link to="/login">
                  <button className="btn btn-danger">Back to Login</button>
                </Link>
              </div>
              <div className="col-lg-6 text-end">
                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-danger"
                  onClick={handleCodeSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
};

export default ForgotPassword;
