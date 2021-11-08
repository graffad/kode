import axios from "axios";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import UsersListComponent from "./UsersListComponent";
import { ReactComponent as SearchSvg } from "../images/search.svg";
import { ReactComponent as SortSvg } from "../images/sort.svg";
import { departments, filterByDepartment } from "../stateManagement/functions";

export default function HomePage() {
  const appContext = useContext(AppContext);
  const { users,filterState } = appContext.appState;

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
            appContext.appDispatch({
              type: "SET_FILTERED_USERS",
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
          <nav className="filters-outer">
            <div className="filters-inner">
              <input
                checked={filterState === "all"}
                type="radio"
                name="department"
                id="radio-all"
                value="all"
                className="filters-inner__radio"
                onChange={() => {
                  appContext.appDispatch({
                    type: "SET_FILTER",
                    payload: "all",
                  });
                  appContext.appDispatch({
                    type: "SET_FILTERED_USERS",
                    payload: filterByDepartment("all", users),
                  });
                }}
              />
              <label htmlFor="radio-all" className="filters-inner__label">
                Все
              </label>
            </div>

            {departments.map((item) => (
              <div className="filters-inner" key={item[0]}>
                <input
                  checked={filterState === item[0]}
                  type="radio"
                  name="department"
                  id={`radio-${item[0]}`}
                  value={item[0]}
                  className="filters-inner__radio"
                  onChange={(event) => {
                    appContext.appDispatch({
                      type: "SET_FILTER",
                      payload: item[0],
                    });
                    appContext.appDispatch({
                      type: "SET_FILTERED_USERS",
                      payload: filterByDepartment(event.target.value, users),
                    });
                  }}
                />
                <label
                  className="filters-inner__label"
                  htmlFor={`radio-${item[0]}`}
                >
                  {item[1]}
                </label>
              </div>
            ))}
          </nav>
        </div>
      </header>
      <UsersListComponent />
    </>
  );
}
