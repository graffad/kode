function formatDate(date) {
  return new Date(date).toLocaleString("ru", {
    day: "numeric",
    month: "short",
  });
}

module.exports = {
  formatDate,
};
