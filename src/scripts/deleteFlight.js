function deleteFlight() {
  const storedRoutes = localStorage.getItem("route");
  const tableRows = document.querySelector("#tableRows");
  const checkboxes = tableRows.getElementsByTagName("input");

  let routeArray = storedRoutes ? JSON.parse(storedRoutes) : [];

  const remainingRoutes = [];
  let index = 0;

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      index++;
      continue;
    }

    if (routeArray[index] !== undefined) {
      remainingRoutes.push(routeArray[index]);
    }

    index++;
  }

  localStorage.setItem("route", JSON.stringify(remainingRoutes));

  updateTable();
}
