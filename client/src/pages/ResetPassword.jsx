import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SERVER_URL = "http://localhost:4000";

const ResetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const changePass = (e) => {
    e.preventDefault();

    if (pass === cpass) {
      axios({
        method: "POST",
        url: `${SERVER_URL}/api/user/reset-password`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        data: {
          _email: email,
          _password: pass,
        },
      })
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            alert("password reset successfull!!");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      alert("Password not matched!");
    }
  };

  return (
    <div className="templatemo-bg-gray">
      <div className="container">
        <div className="col-lg-12">
          <h3 className="text-center mb-5 pb-1">Confirm Password</h3>
          <form
            className="form-horizontal templatemo-forgot-password-form templatemo-container mb-5"
            role="form"
            onSubmit={changePass}
          >
            <div className="form-inner">
              <div className="row form-group">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <label for="first_name" className="control-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="first_name"
                    placeholder="Enter new Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <label for="first_name" className="control-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="first_name"
                    placeholder="Enter new Password"
                    value={cpass}
                    onChange={(e) => setCpass(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <Link to="">
                    <button className="btn btn-outline-danger">Back</button>
                  </Link>
                </div>
                <div className="col-lg-6 text-end">
                  <Link to="">
                    <button className="btn btn-outline-danger" onClick={changePass}>
                      Change
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
