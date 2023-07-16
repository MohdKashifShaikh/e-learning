import { createContext, useContext, useState, useReducer } from "react";
import { initialState, reducer } from "./pages/Reducer/UseReducer.js";
import { initialState_T, TeacherReducer } from "./pages/Reducer/TeacherReducer.js";
import Reacts from "./img/reactjs.webp";
import Node from "./img/nodejs.webp";
import Next from "./img/nextjs.jpeg";
import Mongo from "./img/mongo.png";

const Cart = createContext();

const Context = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [teacher, setTeacher] = useState({});
  const [finalUser, setFinalUser] = useState({});
  const [addCourseModule, setAddCourseModule] = useState({}); // added by teacher

  const [state, dispatch] = useReducer(reducer, initialState); //user Reducer
  const [state_T, dispatch_T] = useReducer(TeacherReducer, initialState_T); //teacher Reducer

  const productsArray = [
    {
      id: 1,
      image: Reacts,
      title: "React JS",
      price: "$300",
      para: "A JavaScript library built by Facebook. A JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      image: Node,
      title: "Node JS",
      price: "$450",
      para: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.It's used for back-end.",
    },
    {
      id: 3,
      image: Next,
      title: "Next JS",
      price: "$400",
      para: "Next.js gives you the best developer experience with all the features you need for production.",
    },
    {
      id: 4,
      image: Mongo,
      title: "Mongo DB",
      price: "$200",
      para: "Improve Your Database Performance With Compatible Database, DocumentDB.",
    },
  ];

  const [products] = useState(productsArray);

  return (
    <Cart.Provider
      value={{
        cart,
        setCart,
        products,
        user,
        setUser,
        teacher,
        setTeacher,
        state,
        dispatch,
        state_T,
        dispatch_T,
        finalUser,
        setFinalUser,
        addCourseModule,
        setAddCourseModule,
      }}
    >
      {children}
    </Cart.Provider>
  );
};
export const CartState = () => {
  return useContext(Cart);
};

export default Context;
