import React from "react";
import { useStateValue } from "../providers/store";

export default () => {
  const [state, dispatch] = useStateValue();
  return (
    <button onClick={() => dispatch({ type: "changeName", newName: "Wendy" })}>
      Change my name: {state.user.name}
    </button>
  );
};
