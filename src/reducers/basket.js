export default (state, action) => {
  switch (action.type) {
    case "addItem":
      const found =
        state.filter(item => item.name === action.newItemName).length > 0;
      if (found) {
        const newState = state.map(item => {
          if (item.name === action.newItemName) {
            item.count += 1;
          }
          return item;
        });
        return newState;
      }
      let nState = state.slice();
      let nItem = { name: action.newItemName, count: 1 };
      nState.push(nItem);
      return nState;
    default:
      return state;
  }
};
