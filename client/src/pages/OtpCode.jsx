import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SERVER_URL = "http://localhost:4000";

const OtpCode = () => {
  const { email } = useParams();

  const [input, setInput] = useState({ code: "" });
  const navigate = useNavigate();
  const checkCode = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: `${SERVER_URL}/api/user/verify-otp`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      data: {
        _email: email,
        _otp: input.code,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          navigate(`/resetpassword/${email}`);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="templatemo-bg-gray">
      <div className="conatiner">
        <div className="col-lg-12">
          <h1 className="margin-bottom-15">Code</h1>
          <form
            className="form-horizontal templatemo-forgot-password-form templatemo-container"
            role="form"
          >
            <div className="form-group">
              <div class="input-group">
                <span class="input-group-text">Enter Otp Code</span>
                <input
                  type="text"
                  aria-label="First name"
                  class="form-control"
                  value={input.code}
                  onChange={(e) => {
                    setInput({ code: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="row" style={{ display: "flex" }}>
              <div className="text-start col-lg-6">
                <Link to="/forgotpassword">
                  <button className="btn btn-outline-danger">Back</button>
                  <br />
                </Link>
              </div>
              <div className="col-lg-6 text-end">
                <button className="btn btn-outline-danger" onClick={checkCode}>
                  Reset Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpCode;
