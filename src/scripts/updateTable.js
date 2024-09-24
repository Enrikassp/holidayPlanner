function updateTable() {
  const storedRoutes = localStorage.getItem("route");
  const tableRows = document.querySelector("#tableRows");

  tableRows.innerHTML = "";
  if (storedRoutes.length > 2) {
    const getRoutes = JSON.parse(storedRoutes);

    if (Array.isArray(getRoutes)) {
      updateHtml(getRoutes);
    }
  } else {
    let templateHTML = `<h1 class="emptyTable">TUŠČIAS</h1>
      `;

    tableRows.innerHTML = templateHTML;
  }
}

function updateHtml(data) {
  const tableRows = document.querySelector("#tableRows");
  let templateHTML = "";
  tableRows.innerHTML = templateHTML;

  data.map((value, index) => {
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
  });
  console.log(templateHTML);
  tableRows.innerHTML = templateHTML;
}
