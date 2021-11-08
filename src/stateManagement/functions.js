function formatDate(date,type="short") {
  // short - "13 нояб."
  // full - "5 июня 1996"
  // count - 21 год/5 лет/ 2года
  switch (type) {
    case "short":
      return new Date(date).toLocaleString("ru", {
        day: "numeric",
        month: "short",
      });

    case "full":
      return new Date(date)
        .toLocaleString("ru", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .replace("г.", "")

    case "count":{
      const years = new Date().getFullYear() - new Date(date).getFullYear();
      const pr = new Intl.PluralRules("ru");
      const suffixes = new Map([
        ["one", "год"],
        ["few", "года"],
        ["many", "лет"],
      ]);
      const rule = pr.select(years);
      const suffix = suffixes.get(rule);
      return `${years} ${suffix}`;
    }


    default: return ""
  }





}

 const departments = [
  ["android", "Android"],
  ["ios", "iOS"],
  ["design", "Дизайн"],
  ["management", "Менеджмент"],
  ["qa", "QA"],
  ["back_office", "Бэк-офис"],
  ["frontend", "Frontend"],
  ["hr", "HR"],
  ["pr", "PR"],
  ["support", "Техподдержка"],
  ["analytics", "Аналитика"],
];

function filterByDepartment(filter, users) {
  let filteredArray;
  if (filter === "all") {
    filteredArray = users;
  } else {
    filteredArray = users.filter((item) => item.department === filter);
  }
  return filteredArray;
}



module.exports = {
  formatDate,
  departments,
  filterByDepartment
};
