import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const SERVER_URL = "http://localhost:4000";

const Register = () => {
  document.title = "Sign Up";

  useEffect(() => {
    _name.current.focus();
  }, []);

  const _name = useRef(null);
  const _email = useRef(null);
  const _uname = useRef(null);
  const _pass = useRef(null);
  const _cpass = useRef(null);
  const submit = useRef(null);

  const [passwordShown, setPasswordShown] = useState(false);
  const [cpasswordShown, setcPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const ctogglePasswordVisiblity = () => {
    setcPasswordShown(cpasswordShown ? false : true);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleFormSubmit = async (e) => {
    // npm i email-validator //install later
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      cpassword === ""
    ) {
      Swal.fire("Empty Fields?", "Please Provide Necessary Credentials?", "question");
    } else if (password !== cpassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...Passwords don't match!",
        footer: "<a>Why do I have this issue?</a>",
      });
    } else {
      // alert("User Registered Successfully!!!!");
      Swal.fire({
        position: "center", //top-center
        icon: "success",
        title: "User has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    axios({
      method: "POST",
      // url: "http://localhost:4000/api/user/register",
      url: `${SERVER_URL}/api/user/register`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      data: {
        name: name,
        email: email,
        username: username,
        password: password,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.toString()));
    // console.log(res);
  };
  return (
    <body className="templatemo-bg-gray">
      <h1 className="margin-bottom-15">User Sign Up</h1>
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-12 col-md-12"> */}
          <form
            className="form-horizontal templatemo-create-account templatemo-container"
            // role="form"
            onSubmit={handleFormSubmit}
          >
            <div className="form-inner">
              <div className="row form-group">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <label for="first_name" className="control-label">
                    Name
                  </label>
                  <input
                    ref={_name}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        _email.current.focus();
                      }
                    }}
                    type="text"
                    className="form-control"
                    id="first_name"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* <div className="col-lg-6 col-md-6">		          	
			            <label for="last_name" className="control-label">Last Name</label>
			            <input type="text" className="form-control" id="last_name" placeholder=""/>		            		            		            
			          </div>              */}
              </div>
              <div className="row form-group">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <label for="email" className="control-label">
                    Email
                  </label>
                  <input
                    ref={_email}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        _uname.current.focus();
                      }
                    }}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <label for="username" className="control-label">
                    Username
                  </label>
                  <input
                    ref={_uname}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        _pass.current.focus();
                      }
                    }}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="row">
                    <label for="password" className="control-label">
                      Password
                    </label>
                    <div className="col-lg-10">
                      <input
                        ref={_pass}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            _cpass.current.focus();
                          }
                        }}
                        type={passwordShown ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-2 p-0">
                      <i className="btn btn-outline-info">
                        <AiOutlineEye onClick={togglePasswordVisiblity} />
                      </i>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="row">
                    <label for="password" className="control-label">
                      Confirm Password
                    </label>
                    <div className="col-lg-10 m-0 pr-0">
                      <input
                        ref={_cpass}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            submit.current.focus();
                          }
                        }}
                        type={cpasswordShown ? "text" : "password"}
                        className="form-control"
                        id="password_confirm"
                        placeholder=""
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-2 p-0">
                      <i
                        className="btn btn-outline-danger"
                        onClick={ctogglePasswordVisiblity}
                      >
                        <AiOutlineEye />
                      </i>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div classname="col-lg-12 col-md-12 col-sm-12 col-12  mb-3">
						<label for="formFile" classname="form-label">Upload Profile</label>
						<input classname="form-control" type="file" id="formFile"/>
					</div> */}
              <div className="row form-group">
                <div className="col-lg-6 d-grid">
                  <button
                    ref={submit}
                    type="submit"
                    value=""
                    className="btn btn-outline-info btn-lg"
                    onClick={handleFormSubmit}
                  >
                    Create account
                  </button>
                </div>
                <div className="col-lg-6">
                  <Link to="/login" className="btn btn-outline-danger btn-lg d-grid">
                    Already Signed Up ?
                  </Link>
                </div>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <Link to="/tsignup" class="templatemo-create-new text-end">
                Sign Up as Teacher
              </Link>
            </div>
          </form>
          {/* </div> */}
        </div>
      </div>
    </body>
  );
};

{
  /* ---------------------------------------Modal---------------------------- */
}
{
  /*<div className="modal fade" id="templatemo_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div className="modal-dialog">
	    <div className="modal-content">
	      <div className="modal-header">
	        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
	        <h4 className="modal-title" id="myModalLabel">Terms of Service</h4>
	      </div>
	      <div className="modal-body">
	      	<p>This form is provided by <a rel="nofollow" href="http://www.templatemo.com/page/1">Free HTML5 Templates</a> that can be used for your websites. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
	        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
	        <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
	      </div>
	      <div className="modal-footer">
	        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
	 <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script> */
}

export default Register;

{
  /* <input
        ref={name_input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            pass.current.focus();
          }
        }}
        type="text"
        placeholder="Enter Name"
      />
      <br/><br/>
      <input ref={pass} type="text" placeholder="Enter Password"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit.current.focus(); */
}
