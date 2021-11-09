import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import reducer from "./stateManagement/reducer";
import HomePage from "./components/HomePage";
import UserProfilePage from "./components/UserProfilePage";

export const AppContext = React.createContext();
const initialState = {
  userInfo: {},
  users: [],
  filteredUsers:[],
  filterState:"all",
  searchState:"",
  sortBy:"alphabet",
  showSort:false,
  isError: false,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appState: state, appDispatch: dispatch }}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/user/:id">
              <UserProfilePage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
