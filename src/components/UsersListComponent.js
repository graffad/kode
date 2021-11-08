import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";
import { formatDate } from "../stateManagement/functions";

export default function UsersListComponent() {
  const appContext = useContext(AppContext);
  const { users, filteredUsers } = appContext.appState;
  const history = useHistory();

  return (
    <section className="section-users">
      <div className="container">
        {filteredUsers.length > 0
          ? filteredUsers.map((item) => (
              <div className="users-outer" key={item.id}>
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
                  />

                  <div className="users-inner__info">
                    <p className="users-inner__info-name">
                      {`${item.firstName} ${item.lastName}`}
                      <span className="users-inner__info-tag">
                        {item.userTag}
                      </span>
                    </p>
                    <p className="users-inner__info-department">
                      {item.department}
                    </p>
                  </div>
                  <div className="users-inner__date">
                    {formatDate(item.birthday)}
                  </div>
                </div>
              </div>
            ))
          : "loading..."}
      </div>
    </section>
  );
}
