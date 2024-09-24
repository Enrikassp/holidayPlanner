updateTable();

function checkInputs(
  destiFrom,
  destiTo,
  destiStart,
  destiEnd,
  destiClass,
  destiConnecting
) {
  if (
    !isNaN(destiFrom) ||
    destiFrom.length <= 0 ||
    !isNaN(destiTo) ||
    destiTo.length <= 0 ||
    destiStart.length <= 0 ||
    destiEnd.length <= 0 ||
    !isNaN(destiClass) ||
    destiClass.length <= 0 ||
    destiConnecting < 0 ||
    destiConnecting.length <= 0
  ) {
    return false;
  } else {
    return true;
  }
}

function addNewRoute() {
  const creationForm = document.querySelector(".creationFormBody");
  creationForm.style.display = "flex";
}

function exitCreationForm() {
  const creationForm = document.querySelector(".creationFormBody");
  creationForm.style.display = "none";
}

function createRoute() {
  const destiFrom = document.querySelector("#destiFrom").value;
  const destiTo = document.querySelector("#destiTo").value;
  const destiStart = document.querySelector("#destiStart").value;
  const destiEnd = document.querySelector("#destiEnd").value;
  const destiClass = document.querySelector("#destiClass").value;
  const destiConnecting = document.querySelector("#destiConnecting").value;
  const checkInputsFunc = checkInputs(
    destiFrom,
    destiTo,
    destiStart,
    destiEnd,
    destiClass,
    destiConnecting
  );

  if (!checkInputsFunc) return alert("NETINKA");
  const calculatedDuration = calculateDestDuration(destiStart, destiEnd);
  const routeData = [
    {
      routeFrom: destiFrom,
      routeTo: destiTo,
      routeStart: destiStart.replace("T", " "),
      routeEnd: destiEnd.replace("T", " "),
      routeDuration: calculatedDuration,
      routeClass: destiClass,
      routeConnecting: destiConnecting,
    },
  ];

  saveToLocalStorageData(routeData);
}

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

function editFlight(index) {
  const storedRoutes = localStorage.getItem("route");
  const destiFrom = document.querySelector("#destiFrom");
  const destiTo = document.querySelector("#destiTo");
  const destiStart = document.querySelector("#destiStart");
  const destiEnd = document.querySelector("#destiEnd");
  const destiClass = document.querySelector("#destiClass");
  const destiConnecting = document.querySelector("#destiConnecting");
  const createRouteBtn = document.querySelector(".createRouteBtn");
  const editRouteBtn = document.querySelector(".editBtn");

  if (storedRoutes) {
    const getRoutes = JSON.parse(storedRoutes);
    if (Array.isArray(getRoutes) && getRoutes[index]) {
      const flightData = getRoutes[index][0];
      const creationForm = document.querySelector(".creationFormBody");
      creationForm.style.display = "flex";
      createRouteBtn.style.display = "none";
      editRouteBtn.style.display = "flex";
      document.querySelector(".editBtn").onclick = function () {
        editRoute(index);
      };
      destiFrom.value = flightData.routeFrom;
      destiTo.value = flightData.routeTo;
      destiStart.value = flightData.routeStart;
      destiEnd.value = flightData.routeEnd;
      destiClass.value = flightData.routeClass;
      destiConnecting.value = flightData.routeConnecting;
    } else {
      alert("Flight not found.");
    }
  }
}

function editRoute(index) {
  const destiFrom = document.querySelector("#destiFrom").value;
  const destiTo = document.querySelector("#destiTo").value;
  const destiStart = document.querySelector("#destiStart").value;
  const destiEnd = document.querySelector("#destiEnd").value;
  const destiClass = document.querySelector("#destiClass").value;
  const destiConnecting = document.querySelector("#destiConnecting").value;

  const checkInputsFunc = checkInputs(
    destiFrom,
    destiTo,
    destiStart,
    destiEnd,
    destiClass,
    destiConnecting
  );

  if (!checkInputsFunc) return alert("NETINKA");

  const calculatedDuration = calculateDestDuration(destiStart, destiEnd);

  const updatedRouteData = {
    routeFrom: destiFrom,
    routeTo: destiTo,
    routeStart: destiStart.replace("T", " "),
    routeEnd: destiEnd.replace("T", " "),
    routeDuration: calculatedDuration,
    routeClass: destiClass,
    routeConnecting: destiConnecting,
  };

  const storedRoutes = localStorage.getItem("route");
  let routeArray = [];

  if (storedRoutes) {
    routeArray = JSON.parse(storedRoutes);
  }

  if (Array.isArray(routeArray) && routeArray[index]) {
    routeArray[index][0] = updatedRouteData;
  } else {
    return alert("Flight not found for editing.");
  }

  console.log(updatedRouteData);

  localStorage.setItem("route", JSON.stringify(routeArray));
  const creationForm = document.querySelector(".creationFormBody");
  creationForm.style.display = "none";

  updateTable();
}

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

function calculateDestDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const differenceInMs = endDate - startDate;
  const totalMinutes = Math.floor(differenceInMs / (1000 * 60)); // Total minutes
  const hours = Math.floor(totalMinutes / 60); // Get the full hours
  const minutes = totalMinutes % 60; // Get the remaining minutes
  // Format hours and minutes to be two digits
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours} hours ${formattedMinutes} mins`;
}

function selectAll(rowClass, sourceCheckbox) {
  var rows = document.getElementsByClassName(rowClass);
  for (var i = 0; i < rows.length; i++) {
    var checkbox = rows[i].getElementsByTagName("input")[0];
    if (checkbox) {
      checkbox.checked = sourceCheckbox.checked;
    }
  }
}
