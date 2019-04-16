import userReducer from "./user";
import basketReducer from "./basket";

export const reducers = ({ user, basket }, action) => ({
    // middleware goes here, i.e calling analytics service, etc.
  user: userReducer(user, action),
  basket: basketReducer(basket, action)
});
