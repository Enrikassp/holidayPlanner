function deleteFlight() {
  const storedRoutes = localStorage.getItem("route");
  const tableRows = document.querySelector("#tableRows");
  const checkboxes = tableRows.getElementsByTagName("input");

  let routeArray = storedRoutes ? JSON.parse(storedRoutes) : [];

  const remainingRoutes = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      continue;
    }
    remainingRoutes.push(routeArray[i]);
  }

  localStorage.setItem("route", JSON.stringify(remainingRoutes));
  updateTable();
}
