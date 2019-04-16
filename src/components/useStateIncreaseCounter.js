import React, { useState } from "react";
export default ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);
  return (
    <button onClick={() => setCount(preCount => preCount + 1)}>
      userState Increment: {count}
    </button>
  );
};
