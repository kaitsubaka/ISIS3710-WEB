const URL =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
let tbody = document.getElementById("content");
const createRow = (data, id) => {
  let idTh = document.createElement("th");
  idTh.scope = "row";
  idTh.innerText = id;
  let eventsTh = document.createElement("th");
  eventsTh.innerText = data.events.join(", ");
  let squirrelTh = document.createElement("th");
  squirrelTh.innerText = data.squirrel;

  let tr = document.createElement("tr");
  if (data.squirrel) {
    tr.classList.add("table-danger");
  }
  tr.appendChild(idTh);
  tr.appendChild(eventsTh);
  tr.appendChild(squirrelTh);
  return tr;
};

fetch(URL)
  .then((resp) => resp.json())
  .then((data) => {
    count = 1;
    data.forEach((element) => {
      tbody.appendChild(createRow(element, count));
      count++;
    });
  });
