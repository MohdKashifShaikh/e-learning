export const initialState_T = null;

export const TeacherReducer = (state_T, action_T) => {
  if (action_T.type === "TEACHER") {
    return action_T.payload;
  }
  return state_T;
};
