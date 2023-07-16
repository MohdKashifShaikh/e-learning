import React, { useState, useContext, useEffect, useCallback } from "react";
import { CartState } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Reacts from "../img/reactjs.webp";
import SingleCourse from "./My_Cart/SingleCourse";
import Swal from "sweetalert2";
// import { CartState } from "../../Context";

const SERVER_URL = "http://localhost:4000";

const Buy = ({ prod }) => {
  document.title = "Buy Courses";
  // const [currentElement, setCurrentElement] = useState([]);
  const [getCards, setCards] = useState([]); // render Cards
  const [renderCartButton, setRenderCartButton] = useState(false);
  const navigate = useNavigate();
  const { cart, setCart } = CartState();
  const { state } = CartState();
  // console.log("HELLO", addCourseModule);
  // const [state, addToCart] = useContext(CartContext);
  const [currEvent, setCurrEvent] = useState(false);

  useEffect(() => {
    const fetchAllCards = async () => {
      const myArray = await axios.get(`${SERVER_URL}/api/teacher/showCourses`);
      // console.log("AllCards : ", myArray.data[0].course_image);
      // console.log(myArray.data);
      setCards(myArray.data);
    };
    fetchAllCards();
    const productData = localStorage.getItem("Product")
      ? JSON.parse(localStorage.getItem("Product"))
      : [];
  }, []);

  // const handleCart = useCallback((e, data, idx) => {
  //   console.log(data);
  // }, []);

  const handleCart = (e, data, idx) => {
    if (!state) {
      alert("Please Login");
      navigate("/login");
    } else {
      setCart([...cart, data]);
      // console.log(JSON.parse(e.view.localStorage.Product));
      // console.log(e.target.value);
      // if (e.target.value === "add") {
      // setRenderCartButton(!renderCartButton);
      // e.target.classList.remove("btn-buy");
      // e.target.classList.add("btn-primary");
      // }
      const productData = localStorage.getItem("Product")
        ? JSON.parse(localStorage.getItem("Product"))
        : [];
      if (productData.length > 0) {
        const foundObj = productData
          .map((ele) => {
            return ele._id;
          })
          .indexOf(data._id);
        if (foundObj === -1) {
          productData.push(data);
          localStorage.setItem("Product", JSON.stringify(productData));
        } else {
          Swal.fire("Already Added!!!");
        }
      } else {
        productData.push(data);
        localStorage.setItem("Product", JSON.stringify(productData));
      }
      // alert("Sure To buy?");
      // axios({
      //   method: "POST",
      //   url: `${SERVER_URL}/api/user/buy-course`,
      //   "Content-type": "appliation/json; charset=utf-8",
      //   data: String("Name"),
      // })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err.toString());
      //   });
    }
  };
  const handleRemoveCart = () => {
    alert("Remove");
  };

  // const cardInfo = [
  //     {
  //         // image:"https://picsum.photos/id/23/150",
  //         image: Reacts,
  //         title:"React JS",
  //         price:"$300",
  //         para:"A JavaScript library built by Facebook. A JavaScript library for building user interfaces"
  //     },
  //     {
  //         // image:"https://picsum.photos/id/23/150",
  //         image: Node,
  //         title:"Node JS",
  //         price:"$150",
  //         para:"Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.It's used for back-end."
  //     },
  //     {
  //         // image:"https://picsum.photos/id/7/150",
  //         image: Next,
  //         title:"Next JS",
  //         price:"$200",
  //         para: "Next.js gives you the best developer experience with all the features you need for production."
  //     },
  //     {
  //         image: Mongo,
  //         title:"Mongo DB",
  //         price:"$375",
  //         para:"Improve Your Database Performance With Compatible Database, DocumentDB."
  //     }
  // ];

  // const renderCard = ( card, index ) =>
  // {
  return (
    <>
      <div>
        <h1>Buy Courses</h1>
        {/* <div style={{ display: "flex" }}>
          {products.map((prod, idx) => (
            <SingleCourse prod={prod} key={idx} />
          ))}
        </div> */}
        <div className="flex-box">
          {/* {console.log(getCards)} */}
          {getCards.map((val, idx) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", border: "1px solid", margin: "2rem" }}
              >
                <img
                  src={`http://localhost:4000/uploads/${val.course_image}`}
                  // alt={val.course_name}
                  width={286.4}
                  height={200}
                />
                <div className="card-body p-0">
                  <div className="p-3">
                    <h4 className="card-title">{val.course_name}</h4>
                    <h5>$ {val.course_price}</h5>
                    <p className="card-text">{val.course_para}</p>
                  </div>
                  {cart.includes(val) ? (
                    <button
                      className="btn-buy"
                      // onClick={() => setCart(cart.filter((c) => c._id !== prod._id))}
                    >
                      {/* Remove from Cart */}
                      Added
                    </button>
                  ) : (
                    <button
                      className="btn-buy"
                      onClick={(e) => handleCart(e, val, idx)}
                      // onClick={() => setCart([...cart, prod])}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {/* {Object.keys(getCards).length > 0 && (
            <>
              <p>Name - {getCards.data[0].course_name}</p>
              <p>Price - {getCards.data[0].course_price}</p>
              <p>Paragraph - {getCards.data[0].course_para}</p>
              <p>Image - </p>
              <img
                src={`http://localhost:4000/uploads/${getCards.data[0].course_image}`}
                alt={getCards.data[0].course_image}
              />
            </>
          )} */}
        </div>
      </div>
    </>
  );

  // return(
  //     <div className="card" style={{"width": "18rem", "border":"1px solid"}} key={index}>
  //     {/* <h4>Cart{cart.length}</h4> */}
  //         <img src={card.image} className="card-img-top" alt="..."/>
  //         <div className="card-body">
  //             <h4 className="card-title">{card.title}</h4>
  //             <h5>{card.price}</h5>
  //             <p className="card-text">{card.para}</p>
  //             <div className="d-block gap-2 mt-2">
  //                 {/* <Link to=""> */}
  //                 {/* onClick={() => addToCart(card)} */}
  //                     <button className="btn" style={{"backgroundColor":"#ad1457", "color":"#fff"}}
  //                     >
  //                         Add to Cart
  //                     </button>
  //                 {/* </Link> */}
  //             </div>
  //                 {/* <Link to="" style={{"float":"right"}}>
  //                     <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  //                         Ask Doubt
  //                     </button>
  //                 </Link> */}
  //             {/* <div className="mt-3">
  //                 <Link to="">
  //                     <button type="button" className="btn"}}>Buy Now</button>
  //                 </Link>
  //             </div> */}
  //         </div>
  //     </div>
  // );
  // }
};

export default Buy;
{
  /* <div className="card" style={{ width: "18rem", border: "1px solid", margin: "2rem" }}>
  <img
    // src={`http://localhost:4000/uploads/${val.course_image}`}
    src={`http://localhost:4000/uploads/${val.course_image}`}
    alt={val.course_name}
    width={286.4}
    height={200}
  />
  <div className="card-body p-0">
    <div className="p-3">
      <h4 className="card-title">{val.course_name}</h4>
      <h5>$ {val.course_price}</h5>
      <p className="card-text">{val.course_para}</p>
    </div>
    {/* <button className="btn-buy" onClick={handleBuyCourse}>
              Buy {val.course_name}
            </button> */
}
{
  /* {renderCartButton ? (
              <button className="btn-buy" onClick={() => handleRemoveCart()}>
                Remove
              </button>
            ) : ( */
}
// <button className="btn-buy" onClick={() => handleCart(val)}>
//   {/* Add to Cart */}
//   {renderCartButton ? "Already Added" : "Add to Cart"}
//     </button>
//     {/* )} */}
//   </div>
// </div>; */}
