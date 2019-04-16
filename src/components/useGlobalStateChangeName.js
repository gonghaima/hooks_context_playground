import React from "react";
import { useStateValue } from "../providers/store";

export default () => {
  const [{ name }, dispatch] = useStateValue();
  return (
    <button onClick={() => dispatch({ type: "changeName", newName: "Wendy" })}>
      Change my name: {name}
    </button>
  );
};
