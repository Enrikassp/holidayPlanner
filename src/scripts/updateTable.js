function updateTable() {
  const storedRoutes = localStorage.getItem("route");
  const tableRows = document.querySelector("#tableRows");

  tableRows.innerHTML = "";
  if (storedRoutes.length > 2) {
    const getRoutes = JSON.parse(storedRoutes);

    if (Array.isArray(getRoutes)) {
      let templateHTML = "";
      for (let i = 0; i < getRoutes.length; i++) {
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

        tableRows.innerHTML = templateHTML;
      }
    }
  } else {
    let templateHTML = `<h1 class="emptyTable">TUŠČIAS</h1>
      `;

    tableRows.innerHTML = templateHTML;
  }
}
