export default (state, action) => {
  switch (action.type) {
    case "changeName":
      return { ...state, name: action.newName };
    default:
      return state;
  }
};
