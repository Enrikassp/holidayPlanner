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
  const createRouteBtn = document.querySelector(".createRouteBtn");
  const editRouteBtn = document.querySelector(".editBtn");
  createRouteBtn.style.display = "block";
  editRouteBtn.style.display = "none";
}

function exitCreationForm() {
  const creationForm = document.querySelector(".creationFormBody");
  creationForm.style.display = "none";
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
