import { useEffect, useState } from "react";
import axios from "axios";
import { CartState } from "../../Context";
import SingleCourse from "./SingleCourse";
import Swal from "sweetalert2";

const SERVER_URL = "http://localhost:4000";

const Cart = () => {
  const { cart, setCart, setFinalUser } = CartState();
  // const [total, setTotal] = useState(0);
  const [cname, setCname] = useState("");
  const [cdoubt, setCdoubt] = useState("");
  const [buyedUser, setBuyedUser] = useState("");
  const [doubt, setDoubt] = useState(false);
  const [cartData, setCartData] = useState([]);

  const handleBuy = async ({ id, name, price }) => {
    alert(id);
    axios({
      method: "POST",
      url: `${SERVER_URL}/api/user/buy-course`,
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      data: {
        c_id: id,
        c_name: name,
        c_price: price,
      },
    })
      .then((res) => {
        const { data } = res.data;
        const { data2 } = res.data;
        setBuyedUser(data2);
        // console.log(`USER IS-${data2.name}`);
        if (res.status === 401) {
          Swal.fire("Please Login to continue!!!");
        } else {
          Swal.fire(`Sure to Buy ${name} for ${price}?`);
          setTimeout(() => {
            setDoubt(true);
          }, 2500);
        }
      })
      .catch((err) => console.log("ERROR in Axios!!!!" + err.toString()));
  };
  const submitDoubts = async (e) => {
    e.preventDefault();
    if (cname === "" || cdoubt === "") {
      Swal.fire("Empty Fields?", "Please Provide Necessary Details?", "question");
    }
    axios({
      method: "POST",
      url: `${SERVER_URL}/api/teacher/doubt`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      data: {
        course_name: cname,
        doubts: cdoubt,
        userDataArray: buyedUser,
      },
    })
      .then((res) => {
        const data2 = res.data;
        // setFinalUser(data2);
        setFinalUser(buyedUser);
        // console.log(buyedUser);
      })
      .catch((err) => console.log(" Error in submitting Doubts!!! " + err.stack));
  };

  // useEffect(() => {
  //   setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
  // }, [cart]);

  useEffect(() => {
    const cartItems = localStorage.getItem("Product")
      ? JSON.parse(localStorage.getItem("Product"))
      : [];
    console.log(cart);
    setCart(cartItems);
    // setCartData(cartItems);
  }, [setCart]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>My Cart</h1>
        {/* <br /> */}
        {/* <span style={{ fontSize: 25 }}>Total: {total}</span> */}
        <div style={{ display: "flex" }}>
          {cart.map((prod) => (
            <>
              <div style={{ display: "inline" }}>
                <SingleCourse prod={prod} key={cart._id} />
                <button
                  className="btn-buy"
                  onClick={() =>
                    handleBuy({
                      id: prod._id,
                      name: prod.title,
                      price: prod.price,
                    })
                  }
                  key={prod.id}
                >
                  Buy {prod.title}
                </button>
                <br />
                {/* button after buying product  */}
                {doubt ? (
                  <button
                    type="button"
                    className="btn-doubt"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Ask Doubt
                  </button>
                ) : null}
                {/* --------------Displaying Buyed User */}
                {/* {Object.keys(buyedUser).length > 0 && (
                  <>
                    <p>{buyedUser.name}</p>
                  </>
                )} */}
                {/* ------------------------------------ */}
                {/* <p>{prod.id}</p> */}
              </div>
            </>
          ))}
        </div>
      </div>
      {/* ---------------------MODAL------------------ */}
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
                Ask Doubt
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitDoubts}>
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Course Name"
                  aria-label="default input example"
                  value={cname}
                  onChange={(e) => setCname(e.target.value)}
                />
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Doubt
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Doubt..."
                    value={cdoubt}
                    onChange={(e) => setCdoubt(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <input
                type="submit"
                value="Submit Doubt"
                className="btn btn-primary"
                onClick={submitDoubts}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
