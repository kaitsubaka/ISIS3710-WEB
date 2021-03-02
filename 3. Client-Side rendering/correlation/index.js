const URL =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";
let tbody = document.getElementById("content");

const createRow = (id, name, correlaion) => {
  let idTh = document.createElement("th");
  idTh.scope = "row";
  idTh.innerText = id;
  let nameTh = document.createElement("th");
  nameTh.innerText = name;
  let correlationTh = document.createElement("th");
  correlationTh.innerText = correlaion;

  let tr = document.createElement("tr");
  tr.appendChild(idTh);
  tr.appendChild(nameTh);
  tr.appendChild(correlationTh);
  return tr;
};

const getAllEvents = (data) => {
  let events = [];
  data.forEach((element) => {
    events = events.concat(element.events);
  });
  return events;
};

fetch(URL)
  .then((resp) => resp.json())
  .then((data) => {
    let allEvents = getAllEvents(data);
    let uniqueEvents = allEvents.filter((v, i, a) => a.indexOf(v) === i); // value, index, array

    result = [];
    uniqueEvents.forEach((uE) => {
      let tp = 0;
      let tn = 0;
      let fp = 0;
      let fn = 0;

      data.forEach((element) => {
        element.squirrel == true
          ? element.events.includes(uE)
            ? tp++
            : fp++
          : element.events.includes(uE)
          ? fn++
          : tn++;
      });

      correlation =
        (tp * tn - fp * fn) /
        Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));

      result.push({ name: uE, correlation });
    });

    result.sort((a, b) => b.correlation - a.correlation);

    count = 1;
    result.forEach((element) => {
      tbody.appendChild(createRow(count, element.name, element.correlation));
      count++;
    });
  });
