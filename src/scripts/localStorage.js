function saveToLocalStorageData(newRouteData) {
  const getCurrentData = localStorage.getItem("route");
  let routeArray = [];

  if (getCurrentData === null || getCurrentData === "") {
    routeArray.push(newRouteData);
  } else {
    routeArray = JSON.parse(getCurrentData);
    if (!Array.isArray(routeArray)) {
      routeArray = [];
    }

    routeArray.push(newRouteData);
  }

  localStorage.setItem("route", JSON.stringify(routeArray));
  updateTable();
}
