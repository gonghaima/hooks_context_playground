import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
};

export default ({ initialCount }) => {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });
  return (
    <button onClick={() => dispatch({ type: "increment" })}>
      useReducer Increment: {state.count}
    </button>
  );
};
