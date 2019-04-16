import React from "react";
import { useStateValue } from "../providers/store";

export default () => {
  const [state, dispatch] = useStateValue();
  return (
    <div>
      <button
        onClick={() => dispatch({ type: "changeName", newName: "Wendy" })}
      >
        Change my name: {state.user.name}
      </button>
      <button
        onClick={() => dispatch({ type: "addItem", newItemName: "apple" })}
      >
        Add an apple
      </button>
      <button
        onClick={() => dispatch({ type: "addItem", newItemName: "orange" })}
      >
        Add an orange
      </button>
      {state.basket.map(item => (
        <div key={item.name}>
          {item.name}:{item.count}
        </div>
      ))}
    </div>
  );
};
