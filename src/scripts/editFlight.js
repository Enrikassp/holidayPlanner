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
      editRouteBtn.style.display = "block";
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
