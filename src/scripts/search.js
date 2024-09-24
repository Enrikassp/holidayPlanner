function searchFlights() {
  const searchTerm = document.querySelector("#searchInput").value.toLowerCase();
  const storedRoutes = localStorage.getItem("route");
  const tableRows = document.querySelector("#tableRows");
  tableRows.innerHTML = "";

  if (storedRoutes) {
    const getRoutes = JSON.parse(storedRoutes);

    if (Array.isArray(getRoutes)) {
      let templateHTML = "";
      for (let i = 0; i < getRoutes.length; i++) {
        const routeFrom = getRoutes[i][0].routeFrom.toLowerCase();
        const routeTo = getRoutes[i][0].routeTo.toLowerCase();
        const routeStart = getRoutes[i][0].routeStart.toLowerCase();
        const routeEnd = getRoutes[i][0].routeEnd.toLowerCase();
        const routeClass = getRoutes[i][0].routeClass.toLowerCase();

        if (
          routeFrom.includes(searchTerm) ||
          routeTo.includes(searchTerm) ||
          routeStart.includes(searchTerm) ||
          routeEnd.includes(searchTerm) ||
          routeClass.includes(searchTerm)
        ) {
          templateHTML += `
            <tr class="tableRowData">
              <td id='tableCheckBox'><input type="checkbox" /></td>
              <td>(${getRoutes[i][0].routeFrom} -> ${getRoutes[i][0].routeTo})</td>
              <td>(${getRoutes[i][0].routeStart})</td>
              <td>(${getRoutes[i][0].routeEnd})</td>
              <td>(${getRoutes[i][0].routeDuration})</td>
              <td>(${getRoutes[i][0].routeClass})</td>
              <td>(${getRoutes[i][0].routeConnecting})</td>
              <td><button onclick="editFlight(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
            </tr>`;
        }
      }

      tableRows.innerHTML = templateHTML;
    }
  }
}
