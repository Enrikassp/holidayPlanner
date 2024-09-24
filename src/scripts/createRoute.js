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
