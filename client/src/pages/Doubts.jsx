import axios from "axios";
import React, { useState } from "react";
import { CartState } from "../Context";

const SERVER_URL = "http://localhost:4000";

const Doubts = () => {
  const { finalUser } = CartState();
  const [doubts, setDoubts] = useState([]);
  // useEffect(() => {
  //   getDoubts();
  // }, []);
  // const abcd = JSON.parse(finalUser);
  const getDoubts = async () => {
    console.log("Final User is : " + JSON.stringify(finalUser));
    if (finalUser.hasOwnProperty("name")) {
      console.log(finalUser.name); //007
    }
    try {
      axios({
        method: "GET",
        url: `${SERVER_URL}/api/teacher/allDoubts`,
        "Content-type": "application/json; Charset=UTS-8",
      }).then((res) => {
        const data = res.data;
        if (res.status !== 200) {
          console.log("Invalid/Error");
        } else {
          // console.log("DATA : " + data);
          setDoubts(data);
        }
      });
    } catch (err) {
      console.log("Error in getting Doubts " + err.toString());
    }
  };

  return (
    <div>
      <h1>Doubts Here</h1>
      <br />
      <button onClick={getDoubts} className="btn-doubt">
        Get Doubt
      </button>
      <br />
      {doubts.map((val) => {
        return (
          <>
            <table>
              <tr>
                <th>COURSE NAME</th>
                <th>DOUBTS</th>
                <th>Asked by</th>
              </tr>
              <tr>
                <td>{val.course_name}</td>
                <td>{val.doubts}</td>
                {Object.keys(finalUser).length > 0 && <td>{finalUser.name}</td>}
              </tr>
            </table>
            {/* {Object.keys(finalUser).length > 0 && (
                <>
                  <p>{finalUser.name}</p>
                </>
              )} */}
            {/* {finalUser.map((val) => {
              return <p>{val}</p>;
            })} */}
            <br />
          </>
        );
      })}
    </div>
  );
};

export default Doubts;
