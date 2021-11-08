export default function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userInfo: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
}