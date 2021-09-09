const enterButton = document.getElementById('enter');
const input = document.getElementById('inputText');
const tableSection = document.getElementById('table-section');
const table = document.getElementById('table');
const tbody = document.getElementById('body-table');
const message = document.getElementById('message');

enterButton.addEventListener('click', (event) => {
  resetTable();
  const heightRef = input.value;
  getresults(heightRef);
  event.preventDefault();
});

async function getresults(heightRef) {
  const resp = await fetch(`app?input=${heightRef}`);
  const data = await resp.json();
  typeof data === 'string' ? printNoDataMessage(data) : printValues(data);
}

function printValues(data) {
  data.forEach((element, index) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerText = element.split('-')[0];
    const td2 = document.createElement('td');
    td2.innerText = element.split('-')[1];
    const th = document.createElement('th');
    th.innerText = index + 1;
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  });
}

function printNoDataMessage(data) {
  message.innerText = data;
  message.style = 'display: flex';
  table.style = 'display: none';
  tableSection.appendChild(message);
}

function resetTable() {
  table.style = 'display: table';
  message.style = 'display: none';
  removeAllChildNodes(tbody);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
