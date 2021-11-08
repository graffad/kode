import axios from "axios";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import UsersListComponent from "./UsersListComponent";
import { ReactComponent as SearchSvg } from "../images/search.svg";
import { ReactComponent as SortSvg } from "../images/sort.svg";

export default function HomePage() {
  const appContext = useContext(AppContext);
  const { users } = appContext.appState;

  useEffect(() => {
    (async () => {
      if (users.length === 0) {
        try {
          const res = await axios.get(
            "https://stoplight.io/mocks/kode-education/trainee-test/25143926/users"
          );
          if (res?.data?.items.length > 0) {
            appContext.appDispatch({
              type: "SET_USERS",
              payload: res?.data?.items,
            });
          }
          // console.log(res?.data?.items);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  return (
    <>
      <header className="header">
        <div className="container">
          <h2>Поиск</h2>
          <div className="search-wrapper">
            <div className="search__svg">
              <SearchSvg />
            </div>
            <input
              className="search__input"
              type="search"
              placeholder="Введи имя, тег, почту..."
            />
            <button className="button-open-sort" type="button">
              <SortSvg />
            </button>
          </div>
          <nav className="filters">tabs</nav>
        </div>
      </header>
      <UsersListComponent />
    </>
  );
}
