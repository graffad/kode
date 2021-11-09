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
// для соответствия по макету
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


function sortUsers(sortValue, arr) {
  function getMonth(date) {
    return new Date(date).getMonth();
  }
  function getDate(date) {
    return new Date(date).getDate();
  }

  const sortCopy = [...arr];
  // ПО АЛФАВИТУ
  if (sortValue === "alphabet") {
    sortCopy.sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
    return sortCopy;
  }
  // ПО ДНЮ РОЖДЕНИЯ

  // разделить на массивы
  const now = new Date();
  const closest = [];
  const nextYear = [];

  // распределить в каждый
  sortCopy.forEach((item) => {
    if (getMonth(item.birthday) >= getMonth(now)) {
      if (getDate(item.birthday) > getDate(now)) {
        closest.push(item);
      } else {
        nextYear.push(item);
      }
    } else {
      nextYear.push(item);
    }
  });

  // отсортировать каждый
  closest.sort(
    (a, b) =>
      getMonth(a.birthday) - getMonth(b.birthday) ||
      getDate(a.birthday) - getDate(b.birthday)
  );
  nextYear.sort(
    (a, b) =>
      getMonth(a.birthday) - getMonth(b.birthday) ||
      getDate(a.birthday) - getDate(b.birthday)
  );
  // собрать
  return closest.concat(nextYear);
}

// найти первый индекс для разделителя по дате (след. год)
function dividingYearLineIndex(filteredUsers) {
  const now = new Date();
  return filteredUsers.findIndex(
    (item) =>
      new Date(item.birthday).getMonth() < now.getMonth() ||
      new Date(item.birthday).getDate() < now.getDate()
  );
}



module.exports = {
  formatDate,
  departments,
  filterByDepartment,
  sortUsers,
  dividingYearLineIndex
};
