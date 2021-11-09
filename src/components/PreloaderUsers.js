export default function PreloaderUsers() {
  return (
    <section className="section-users">
      <div className="container">
        {[1,1,1,1,1,1,1].map((item,index) => (
          <div key={`${index}s`} className="users-inner">
            test
            <div className="users-inner__image users-inner__image--preloader" />
            <div className="users-inner__info users-inner__info--preloader">
              <p className="users-inner__info-name users-inner__info-name--preloader" />
              <p className="users-inner__info-department users-inner__info-department--preloader" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
