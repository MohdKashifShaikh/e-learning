const loggedInUserState = localStorage.getItem("STATE")
  ? JSON.parse(localStorage.getItem("STATE"))
  : false;
export const initialState = loggedInUserState;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
