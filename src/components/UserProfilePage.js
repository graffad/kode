import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { ReactComponent as Arrow } from "../images/arrow.svg";
import { ReactComponent as Star } from "../images/star.svg";
import { ReactComponent as Cell } from "../images/cell.svg";
import { formatDate, departments } from "../stateManagement/functions";
import ErrorComponent from "./ErrorComponent";
import logo from "../images/logo.png"


export default function UserProfilePage() {
  const appContext = useContext(AppContext);
  const { userInfo } = appContext.appState;
  const [preloader, setPreloader] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (Object.entries(userInfo).length === 0) {
      // при переходе с главной - данные из стора
      // при обновлении страницы -
      // - повторная загрузка и фильтр по id (без dynamic!)
      (async () => {
        try {
          // setPreloader(true);
          const res = await axios.get(
            "https://stoplight.io/mocks/kode-education/trainee-test/25143926/users"
            // {headers:{
            //     'Content-Type': 'application/json',
            //     'Prefer': 'code=500, example=error-500'
            //   }}
            // {headers:{
            //     'Content-Type': 'application/json',
            //     'Prefer': 'code=200, dynamic=true'
            //   }}
          );
          if (res?.data?.items.length > 0) {
            const user = res.data.items.filter(
              (item) => item.id === params.id
            )[0];
            if (user !== undefined) {
              appContext.appDispatch({
                type: "SET_USER",
                payload: user,
              });
            } else {
              appContext.appDispatch({
                type: "SET_USER",
                payload: {},
              });
            }
          } else {
            appContext.appDispatch({
              type: "SET_USER",
              payload: {},
            });
          }
          setPreloader(false);
          setError(false);
        } catch (e) {
          setError(true);
          setPreloader(false);
          console.log(e);
        }
      })();
    }
  }, []);

  if (preloader && Object.entries(userInfo).length === 0) {
    return <div>loading...</div>;
  }
  if (error) {
    return <ErrorComponent type="error" />;
  }
  if (!preloader && Object.entries(userInfo).length === 0) {
    return <ErrorComponent type="not-found" />;
  }

  return (
    <>
      <header className="header-user-profile">
        <div className="container">
          <button
            type="button"
            className="header-user-profile__btn-back"
            onClick={() => history.goBack()}
          >
            <Arrow />
          </button>
          <div className="user-info-wrapper">
            <img
              className="user-info__img"
              src={userInfo?.avatarUrl}
              alt={userInfo?.lastName}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = logo;
              }}
            />
            <h2>
              {`${userInfo?.firstName} ${userInfo?.lastName}`}
              <span className="user-info__tag">{userInfo?.userTag}</span>
            </h2>
            <p className="user-info__department">
              {
                // форматировать название департамента в рус.
                departments
                  .filter((dep) => dep[0] === userInfo?.department)
                  .flat()[1]
              }
            </p>
          </div>
        </div>
      </header>
      <div className="container">
        <main className="user-contacts-wrapper">
          <div className="user-contacts ">
              <Star />
            {formatDate(userInfo?.birthday, "full")}
            <span className="user-contacts__years">
              {formatDate(userInfo?.birthday, "count")}
            </span>
          </div>
          <div className="user-contacts">
              <Cell />
            <a
              className="user-contacts__phone"
              href={`tel:${userInfo?.phone?.replace(/-/g, "")}`}
            >
              {userInfo?.phone}
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
