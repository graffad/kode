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
    case "SET_SEARCH":
      return { ...state, searchState: action.payload };
    case "SET_SHOW_SORT":
      return { ...state, showSort: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_ERROR":
      return { ...state, isError: action.payload };
    case "SET_SHOW_PRELOADER":
      return { ...state, showPreloader: action.payload };
    default:
      return state;
  }
}
