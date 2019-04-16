import userReducer from "./user";
import basketReducer from "./basket";

export const reducers = ({ user, basket }, action) => ({
  user: userReducer(user, action),
  basket: basketReducer(basket, action)
});
