export default function ErrorComponent({ type }) {
  return (
    <div className="error-wrapper">
      {type === "error" ? (
        <>
          <div className="error__emoji"> &#128760;</div>
          <p>Какой-то сверхразум все сломал</p>
          <p>Постараемся быстро починить</p>
          <button type="button" onClick={() => window.location.reload()}>
            Попробовать снова
          </button>
        </>
      ) : (
        <>
          <div className="error__emoji"> &#x1f50d;</div>
          <p>Мы никого не нашли</p>
          <p>Попробуй скорректировать запрос</p>
        </>
      )}
    </div>
  );
}
