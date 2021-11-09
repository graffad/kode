import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import {sortUsers} from "../stateManagement/functions";
import { ReactComponent as Cross } from "../images/cross.svg";

export default function ModalSort() {
  const appContext = useContext(AppContext);

  const { sortBy, showSort, filteredUsers } = appContext.appState;

  return (
    <>
      {showSort ? (
        <div className="modal-sort-outer">
          <div className="modal-sort-inner">
            <p className="modal-sort-inner__header">
              Сортировка
              <button
                className="modal-sort-inner__btn-close"
                type="button"
                onClick={() => {
                  appContext.appDispatch({
                    type: "SET_SHOW_SORT",
                    payload: false,
                  });
                }}
              >
                <Cross />
              </button>
            </p>
            <div className="modal-sort-inner__radio-wrapper">
              <input
                defaultChecked={sortBy === "alphabet"}
                type="radio"
                className="sort-radio"
                id="radio-alphabet"
                value="alphabet"
                name="sort"
                onChange={() => {
                  appContext.appDispatch({
                    type: "SET_SORT",
                    payload: "alphabet",
                  });
                  appContext.appDispatch({
                    type: "SET_SHOW_SORT",
                    payload: false,
                  });
                  appContext.appDispatch({
                    type: "SET_FILTERED_USERS",
                    payload: sortUsers("alphabet", filteredUsers),
                  });
                }}
              />
              <label className="sort-label" htmlFor="radio-alphabet">
                По алфавиту
              </label>
            </div>
            <div className="modal-sort-inner__radio-wrapper">
              <input
                defaultChecked={sortBy === "date"}
                type="radio"
                id="radio-date"
                value="date"
                name="sort"
                className="sort-radio"
                onChange={() => {
                  appContext.appDispatch({ type: "SET_SORT", payload: "date" });
                  appContext.appDispatch({
                    type: "SET_SHOW_SORT",
                    payload: false,
                  });
                  appContext.appDispatch({
                    type: "SET_FILTERED_USERS",
                    payload: sortUsers("date", filteredUsers),
                  });
                }}
              />
              <label className="sort-label" htmlFor="radio-date">
                По дню рождения
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}