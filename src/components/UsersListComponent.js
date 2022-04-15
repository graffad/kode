import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";
import ErrorComponent from "./ErrorComponent";
import {
  formatDate,
  departments,
  dividingYearLineIndex,
} from "../stateManagement/functions";
import logo from "../images/logo.png"

export default function UsersListComponent() {
  const appContext = useContext(AppContext);
  const { filteredUsers, sortBy, isError } = appContext.appState;
  const history = useHistory();

  if(isError){
    return <ErrorComponent type="error" />
  }
  if(filteredUsers.length === 0){
    return <ErrorComponent type="not-found" />
  }

  return (
    <section className="section-users">
      <div className="container">
        {filteredUsers.map((item, index) => (
              <div className="users-outer" key={item.id}>
                {
                  // разделитель ДР (след. год)
                  filteredUsers.length > 0 &&
                  sortBy === "date" &&
                  index === dividingYearLineIndex(filteredUsers) ? (
                    <div className="dividing-line">
                      <span>{new Date().getFullYear() + 1}</span>
                    </div>
                  ) : (
                    ""
                  )
                }

                <div
                  className="users-inner"
                  onClick={() => {
                    appContext.appDispatch({ type: "SET_USER", payload: item });
                    history.push(`/user/${item.id}`);
                  }}
                >
                  <img
                    className="users-inner__image"
                    src={item.avatarUrl}
                    alt={item.lastName}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = logo;
                    }}
                  />

                  <div className="users-inner__info">
                    <p className="users-inner__info-name">
                      {`${item.firstName} ${item.lastName}`}
                      <span className="users-inner__info-tag">
                        {item.userTag}
                      </span>
                    </p>
                    <p className="users-inner__info-department">
                      {
                        // форматировать название департамента в рус.
                        departments
                          .filter((dep) => dep[0] === item.department)
                          .flat()[1]
                      }
                    </p>
                  </div>
                  <div className="users-inner__date">
                    {
                      // показывать др в зависимости от сорт.
                      sortBy === "date" ? (
                        <div className="users-inner__date">
                          {formatDate(item.birthday)}
                        </div>
                      ) : (
                        ""
                      )
                    }
                  </div>
                </div>
              </div>
            ))
         }
      </div>
    </section>
  );
}
