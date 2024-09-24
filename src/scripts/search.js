function searchFlights() {
  const searchTerm = document.querySelector("#searchInput").value.toLowerCase();
  const storedRoutes = localStorage.getItem("route");
  const tableRows = document.querySelector("#tableRows");
  tableRows.innerHTML = "";

  if (storedRoutes) {
    const getRoutes = JSON.parse(storedRoutes);

    if (Array.isArray(getRoutes)) {
      let templateHTML = "";

      getRoutes.map((value, index) => {
        const routeFrom = value[0].routeFrom.toLowerCase();
        const routeTo = value[0].routeTo.toLowerCase();
        const routeStart = value[0].routeStart.toLowerCase();
        const routeEnd = value[0].routeEnd.toLowerCase();
        const routeClass = value[0].routeClass.toLowerCase();

        if (
          routeFrom.includes(searchTerm) ||
          routeTo.includes(searchTerm) ||
          routeStart.includes(searchTerm) ||
          routeEnd.includes(searchTerm) ||
          routeClass.includes(searchTerm)
        ) {
          updateHtml(getRoutes);
          templateHTML += `
              <tr class="tableRowData">
                <td id='tableCheckBox'><input type="checkbox" /></td>
                <td>(${value[0].routeFrom} -> ${value[0].routeTo})</td>
                <td>(${value[0].routeStart})</td>
                <td>(${value[0].routeEnd})</td>
                <td>(${value[0].routeDuration})</td>
                <td>(${value[0].routeClass})</td>
                <td>(${value[0].routeConnecting})</td>
                <td><button onclick="editFlight(${index})"><i class="fa-solid fa-pen-to-square"></i></button></td>
              </tr>`;
        }
      });

      tableRows.innerHTML = templateHTML;
    }
  }
}
