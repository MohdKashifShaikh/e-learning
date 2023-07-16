import React, { useState } from "react";
import axios from "axios";
import { CartState } from "../Context";
const SERVER_URL = "http://localhost:4000";

const AddCourses = () => {
  const [cname, setCname] = useState("");
  const [cprice, setCprice] = useState("");
  const [cpara, setCpara] = useState("");
  const [cimage, setCimage] = useState();
  const { addCourseModule, setAddCourseModule } = CartState();
  const [pqr, setPqr] = useState({});

  const handleFormData = async (e) => {
    e.preventDefault();
    const courseAdd = new FormData();
    courseAdd.append("name", cname);
    courseAdd.append("price", cprice);
    courseAdd.append("para", cpara);
    courseAdd.append("file", cimage);
    console.log("IMAGE", cimage);
    axios({
      method: "POST",
      url: `${SERVER_URL}/api/teacher/add-course`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // "Content-Type": `multipart/form-data; boundary=----WebKitFormBoundarydMIgtiA2YeB1Z0kl`,
      },
      data: courseAdd,
    })
      .then((res) => {
        const { data } = res.data;
        setPqr(data);
        /* 
          data1.name, data1.price, data1.para;
          data2.fieldname, data2.filename, data2.originalname;
        */
        // if (res.status === 200) {
        // setAddCourseModule(data);
        // }
      })
      .catch((err) => console.log("Error in adding Course Card !!!" + err.stack));
  };

  return (
    <div>
      <body className="templatemo-bg-gray">
        <h1 className="margin-bottom-15">Add Courses</h1>
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-12 col-md-12"> */}
            <form
              className="form-horizontal templatemo-create-account templatemo-container"
              enctype="multipart/form-data"
              // role="form"
              onSubmit={handleFormData}
            >
              <div className="form-inner">
                <div className="row form-group">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label for="first_name" className="control-label">
                      Course Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder=""
                      value={cname}
                      onChange={(e) => setCname(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <label for="first_name" className="control-label">
                      Course Price
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">$</span>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Dollar amount"
                        value={cprice}
                        onChange={(e) => setCprice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                    <label for="email" className="control-label">
                      Paragraph
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={cpara}
                      onChange={(e) => setCpara(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                    <div className="row">
                      <div>
                        <label for="formFile" className="form-label">
                          Course Image
                        </label>
                        <input
                          name="img"
                          className="form-control"
                          id="file"
                          type="file"
                          onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            setCimage(selectedFile);
                          }}
                          // onChange={(e) => onFileChange(e)}
                          // value={cimage}
                          // onChange={(e) => setCimage(e.target.files[0])}
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-2 p-0">
                      </div> */}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-lg-12 d-grid">
                    <button
                      type="submit"
                      value=""
                      className="btn btn-outline-info btn-lg"
                      onClick={handleFormData}
                    >
                      Create Course
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <br />
          </div>
          <br />
          <br />
        </div>
      </body>
      {/* -------------------------DB Cards------------- */}
      {Object.keys(pqr).length > 0 && (
        <>
          <p>{pqr.name}</p>
          <p>{pqr.price}</p>
          <p>{pqr.para}</p>
          <p>{pqr.file}</p>
        </>
      )}
    </div>
  );
};

export default AddCourses;
