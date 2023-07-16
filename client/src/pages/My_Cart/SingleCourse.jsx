import { CartState } from "../../Context";
import { useEffect } from "react";

const SingleCourse = ({ prod }) => {
  const { cart, setCart, addCourseModule } = CartState();
  // console.log("HELLO", addCourseModule);
  // useEffect(() => {
  //   console.log(prod);
  //   console.log(cart);
  // }, []);

  useEffect(() => {
    //   const cartItems = localStorage.getItem("Product")
    //     ? JSON.parse(localStorage.getItem("Product"))
    //     : [];
    //   // console.log(cartItems);
    //   // console.log(prod);
    // setCart([prod])
  }, [prod]);

  const handleRemoveCart = (prod) => {
    const cartData = localStorage.getItem("Product")
      ? JSON.parse(localStorage.getItem("Product"))
      : [];
    if (cartData.length > 0) {
      setCart(cartData.filter((c) => c._id !== prod._id));
      const data = cartData.filter((val) => val._id !== prod._id);
      localStorage.setItem("Product", JSON.stringify(data));
      return;
    }
    // alert("No items in Cart");
  };

  return (
    <>
      <div
        className="card"
        style={{ width: "18rem", border: "1px solid", margin: "2rem" }}
      >
        <img
          src={`http://localhost:4000/uploads/${prod.course_image}`}
          alt={prod.course_name}
          className="card-img-top"
          width={286.4}
          height={200}
        />
        {/* <img src={addCourseModule.name} alt={prod.title} className="card-img-top" /> */}
        <div className="card-body">
          <h4 className="card-title">{prod.course_name}</h4>
          <h5>$ {prod.course_price}</h5>
          <p className="card-text">{prod.course_para}</p>
        </div>

        {cart.includes(prod) ? (
          <button
            className="btn-cart"
            // onClick={() => setCart(cart.filter((c) => c._id !== prod._id))}
            onClick={() => handleRemoveCart(prod)}
          >
            Remove from Cart
          </button>
        ) : (
          <button className="btn-cart" onClick={() => setCart([...cart, prod])}>
            Add to Cart
          </button>
        )}
      </div>
    </>
  );
};

export default SingleCourse;
