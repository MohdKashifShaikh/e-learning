import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CartState } from "../Context";

const SERVER_URL = "http://localhost:4000";

const Login = ({ authenticate }) => {
  document.title = "Login";
  const navigate = useNavigate();

  const { setUser, setTeacher, state, dispatch } = CartState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputs = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      Swal.fire("Empty Fields?", "Please Provide Necessary Credentials?", "question");
    }

    axios({
      method: "POST",
      url: `${SERVER_URL}/api/user/login`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      data: {
        _email: email,
        _password: password,
      },
    })
      .then((res) => {
        const { data } = res.data;
        // console.log(data);
        setTeacher({});
        setUser(data);
        // setIsAuth(true);
        if (res.status !== 200) {
          Swal.fire(`Invalid!!!`);
        } else {
          Swal.fire(`Welcome ${data.name}`);
          // dispatch({ type: "USER", payload: true });
          localStorage.setItem("LoggedInUser", JSON.stringify(data));
          // const userData = localStorage.getItem("LoggedInUser")
          //   ? JSON.parse(localStorage.getItem("LoggedInUser"))
          //   : [];
          localStorage.setItem("STATE", JSON.stringify(true));
          dispatch({ type: "USER", payload: true });
          // authenticate();
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log("Error in Login:" + err.toString());
      });
  };

  return (
    <body class="templatemo-bg-gray">
      <div class="container">
        <div class="col-md-12">
          <h1 class="margin-bottom-15">User Login</h1>
          <form
            class="form-horizontal templatemo-container templatemo-login-form-1 margin-bottom-30"
            // role="form"
            onSubmit={handleInputs}
          >
            <div class="form-group">
              <div class="col-xs-12">
                <div class="control-wrapper">
                  <label for="username" class="control-label fa-label">
                    <i className="fa fa-user fa-medium"></i>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="control-wrapper">
                  <label for="password" className="control-label fa-label">
                    <i className="fa fa-lock fa-medium"></i>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-lg-6">
                <div className="control-wrapper">
                  <input
                    type="submit"
                    value="Log in"
                    className="btn btn-danger"
                    onClick={handleInputs}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="control-wrapper">
                  <Link to="/forgotpassword" className="text-end">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            {/* <div class="form-group">
		        	<div class="col-md-12">
		        		<label>Login with: </label>
		        		<div class="inline-block">
		        			<Link to=""><i class="fa fa-facebook-square login-with"></i>facebook</Link>
			        		<Link to=""><i class="fa fa-twitter-square login-with"></i></Link>
			        		<Link to=""><i class="fa fa-google-plus-square login-with"></i></Link>
			        		<Link to=""><i class="fa fa-tumblr-square login-with"></i></Link>
			        		<Link to=""><i class="fa fa-github-square login-with"></i></Link>
		        		</div>		        		
		        	</div>
		        </div> */}
            <div className="text-center">
              <Link to="/loginT" class="templatemo-create-new">
                Login as Teacher
                <i class="fa fa-arrow-circle-o-right"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
};

export default Login;

// <div>
//   <h2>Login Page</h2>
//   <form>
//     <input type="email" placeholder="Enter Email" required/><br/>
//     <input type="password" placeholder="Enter Password"/><br/>
//     <button onClick={onSubmit}>Login</button>
//     <Link to="/register">
//       <button>Sign Up</button>
//     </Link>
//     <br/>
//     <Link to="/forgotpassword"> Forgot Password ? </Link>
//   </form>
// </div>
