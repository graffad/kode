export default function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userInfo: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_FILTERED_USERS":
      return { ...state, filteredUsers: action.payload };
    case "SET_FILTER":
      return { ...state, filterState: action.payload };
    default:
      return state;
  }
}
