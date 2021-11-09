import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import UsersListComponent from "./UsersListComponent";
import ModalSort from "./ModalSort";
import PreloaderUsers from "./PreloaderUsers";
import { ReactComponent as SearchSvg } from "../images/search.svg";
import { ReactComponent as SortSvg } from "../images/sort.svg";
import {
  departments,
  filterByDepartment,
  sortUsers,
} from "../stateManagement/functions";

export default function HomePage() {
  const appContext = useContext(AppContext);
  const { users, filterState, searchState, sortBy,showPreloader } = appContext.appState;
  // const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    (async () => {
      if (users.length === 0) {
        try {
          // setShowPreloader(true);
          const res = await axios.get(
            "https://stoplight.io/mocks/kode-education/trainee-test/25143926/users",
            // {
            //   headers: {
            //     "Content-Type": "application/json",
            //     Prefer: "code=500, example=error-500",
            //   },
            // }
            // {headers:{
            //     'Content-Type': 'application/json',
            //     'Prefer': 'code=200, dynamic=true'
            //   }}
          );
          if (res?.data?.items.length > 0) {
            appContext.appDispatch({
              type: "SET_USERS",
              payload: res?.data?.items,
            });
            appContext.appDispatch({
              type: "SET_FILTERED_USERS",
              payload: sortUsers(sortBy, res?.data?.items),
            });
          }
          // setShowPreloader(false);
          appContext.appDispatch({
            type: "SET_SHOW_PRELOADER",
            payload: false,
          });
          appContext.appDispatch({
            type: "SET_ERROR",
            payload: false,
          });
        } catch (e) {
          appContext.appDispatch({
            type: "SET_ERROR",
            payload: true,
          });
          console.log(e);
          // setShowPreloader(false);
          appContext.appDispatch({
            type: "SET_SHOW_PRELOADER",
            payload: false,
          });
        }
      }
    })();
  }, []);

  function handleSearch(search, dataArr) {
    // почты нет в апи = по ней не ищет

    // для сохранения при переходе между страницами
    appContext.appDispatch({
      type: "SET_SEARCH",
      payload: search,
    });

    const result = dataArr.filter((item) =>
      Object.values(item).some((str) =>
        str.toLowerCase().match(new RegExp(search.toLowerCase(), "g"))
      )
    );
    appContext.appDispatch({
      type: "SET_FILTERED_USERS",
      payload: result,
    });
  }

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
              value={searchState}
              className="search__input"
              type="search"
              placeholder="Введи имя, тег, почту..."
              onChange={(event) => {
                handleSearch(
                  event.target.value,
                  sortUsers(sortBy, filterByDepartment(filterState, users))
                );
              }}
            />
            <button
              className={`button-open-sort ${
                sortBy === "date" ? "active-sort" : ""
              }`}
              type="button"
              onClick={() => {
                appContext.appDispatch({
                  type: "SET_SHOW_SORT",
                  payload: true,
                });
              }}
            >
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
                  // фильтрует по состоянию поиска + департамент + сорт
                  handleSearch(
                    searchState,
                    sortUsers(sortBy, filterByDepartment("all", users))
                  );
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
                    // фильтрует по состоянию поиска + департамент + сорт
                    handleSearch(
                      searchState,
                      sortUsers(
                        sortBy,
                        filterByDepartment(event.target.value, users)
                      )
                    );
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
      <ModalSort />
      {showPreloader ? <PreloaderUsers /> : <UsersListComponent />}
    </>
  );
}
