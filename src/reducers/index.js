import userReducer from "./user";

export const reducers = ({ user }, action) => ({
  user: userReducer(user, action)
});
