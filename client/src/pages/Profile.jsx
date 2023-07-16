import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Login from "./Login";
// import { useAuth } from "react-use-auth";
import { CartState } from "../Context";
import Swal from "sweetalert2";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";

const SERVER_URL = "http://localhost:4000";

const Profile = () => {
  document.title = "Profile";
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [cpasswordShown, setcPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const ctogglePasswordVisiblity = () => {
    setcPasswordShown(cpasswordShown ? false : true);
  };
  const { user, setUser, teacher } = CartState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const res = localStorage.getItem("LoggedInUser")
      ? JSON.parse(localStorage.getItem("LoggedInUser"))
      : [];
    setUser(res);
  }, []);

  /* --------------------Delete User-------------------- */
  const deleteOne = (_id) => {
    setDialog(true);
    if (setDialog) {
      axios({
        method: "POST",
        url: `${SERVER_URL}/api/user/delete`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          id: _id,
        },
      })
        .then((res) => {
          // const {} = res.data;
          // console.log();
          if (res.status === 202) {
            Swal.fire("Deleted Successfully!!!");
            console.log("Deleted Succes!!!!!!");
            navigate("/login");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error in Profile :" + err.toString());
        });
    }
  };
  /* --------------------Update User-------------------- */
  const updateInputs = async (e) => {
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
        // footer: "<a>Why do I have this issue?</a>",
      });
    } else {
      Swal.fire({
        position: "center", //top-center
        icon: "success",
        title: "User updated successfully!!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setCPassword("");
    }

    axios({
      method: "POST",
      url: `${SERVER_URL}/api/user/update`,
      data: {
        name: name,
        email: email,
        username: username,
        password: password,
      },
    }).then((res) => {
      // if (res.status === 204) {
      //   Swal.fire({
      //     position: "center", //top-center
      //     icon: "success",
      //     title: "User has been updated successfully!",
      //     showConfirmButton: false,
      //     timer: 900,
      //   });
      //   // window.location.reload();
      // }
      console.log("Success!!!");
    });
  };
  // const arr = user.mycourses;

  return (
    <>
      <div>
        <h1>Profile</h1>
        <br />
        {Object.keys(user).length > 0 && (
          <>
            <h1>User Profile</h1>
            <table className="profile-table">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>USERNAME</th>
                {/* <th>COURSES BUYED</th> */}
                <th>ACTION</th>
              </tr>
              <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                {/* <td>
                  {arr.map((val, idx) => {
                    return <p>{val.course_name}</p>;
                  })}
                  <br />
                </td> */}
                <td>
                  <button
                    type="button"
                    className="btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <AiOutlineEdit />
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <MdOutlineDeleteOutline />
                    Delete
                  </button>
                </td>
              </tr>
            </table>
            <br />
          </>
        )}

        {Object.keys(teacher).length > 0 && (
          <>
            <h1>Teacher Profile</h1>
            <br />
            <table className="profile-table">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>USERNAME</th>
                <th>ACTION</th>
              </tr>
              <tr>
                <td>{teacher._id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.username}</td>
                <td>
                  <button
                    type="button"
                    className="btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    <AiOutlineEdit />
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn-delete"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <MdOutlineDeleteOutline />
                    Delete
                  </button>
                </td>
              </tr>
            </table>
          </>
        )}

        <br />
        <br />
      </div>
      {/* -----------------------------Update FORM MODAL---------------------- */}
      <div
        className="modal fade modal-dialog modal-dialog-centered"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                <h3>Update User Data</h3>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* --------------------------------------Update Form------------------------------- */}

              <form
                className="form-horizontal templatemo-create-account templatemo-container"
                // role="form"
                onSubmit={updateInputs}
              >
                <div className="form-inner">
                  <div className="row form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <label for="first_name" className="control-label">
                        Name
                      </label>
                      <input
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
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <input
                type="submit"
                value="Update"
                className="btn btn-primary"
                onClick={updateInputs}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- Delete Modal------------------------------ */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure ?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => deleteOne(user._id)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
