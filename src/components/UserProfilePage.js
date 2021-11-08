import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "../App";
import { ReactComponent as Arrow } from "../images/arrow.svg";
import { ReactComponent as Star } from "../images/star.svg";
import { ReactComponent as Cell } from "../images/cell.svg";
import { formatDate } from "../stateManagement/functions";

export default function UserProfilePage() {
  const appContext = useContext(AppContext);
  const { userInfo } = appContext.appState;
  const [preloader, setPreloader] = useState(false);

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (Object.entries(userInfo).length === 0) {
      // при обновления страницы - повторная загрузка (без dynamic!)
      (async () => {
        try {
          setPreloader(true);
          const res = await axios.get(
            "https://stoplight.io/mocks/kode-education/trainee-test/25143926/users"
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
        } catch (e) {
          setPreloader(false);
          console.log(e);
        }
      })();
    }
  }, []);

  if (preloader) {
    return <div>loading...</div>;
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
            />
            <h2>
              {`${userInfo?.firstName} ${userInfo?.lastName}`}
              <span className="user-info__tag">{userInfo?.userTag}</span>
            </h2>
            <p className="user-info__department">{userInfo?.department}</p>
          </div>
        </div>
      </header>
      <div className="container">
        <main className="user-contacts-wrapper">
          <div className="user-contacts ">
            <div className="user-contacts__svg">
              <Star />
            </div>
            {formatDate(userInfo?.birthday, "full")}
            <span className="user-contacts__years">
              {formatDate(userInfo?.birthday, "count")}
            </span>
          </div>
          <div className="user-contacts">
            <div className="user-contacts__svg">
              <Cell />
            </div>
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
