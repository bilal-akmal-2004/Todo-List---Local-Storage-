let data = [];
localStorage.setItem("List Items", JSON.stringify(data));
function addMe(e) {
  e.preventDefault();
  let inp = document.getElementById("input");
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("List Items"));
  dataFromLocalStorage = [
    ...dataFromLocalStorage,
    { list: inp.value, status: false },
  ];
  localStorage.setItem("List Items", JSON.stringify(dataFromLocalStorage));
  loadingData();
}

function doneListItem(i) {
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("List Items"));
  dataFromLocalStorage[i].status = true;
  localStorage.setItem("List Items", JSON.stringify(dataFromLocalStorage));
  loadingData();
}

function loadingData() {
  let box = document.getElementById("box");
  box.innerHTML = "";
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("List Items"));
  for (let i = 0; i < dataFromLocalStorage.length; i++) {
    if (dataFromLocalStorage[i].status == true) {
      box.innerHTML += `<p id="${i}" style="text-decoration: line-through;">${dataFromLocalStorage[i].list}</p>
       <button onclick="removeList(${i})"><i class="fa-solid fa-trash-can"></i></button>`;
    } else {
      box.innerHTML += `<p id="${i}">${dataFromLocalStorage[i].list}</p>
       <input type="text" id="hiddenInput">
       <button onclick="removeList(${i})"><i class="fa-solid fa-trash-can"></i></button>
       <button onclick="updateList(event, ${i})">Update</button>
       <button onclick="doneListItem(${i})"><i class="fa-solid fa-check"></i></button>
       `;
    }
  }
}

function savingUpdatedData(id, value) {
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("List Items"));
  dataFromLocalStorage[id] = { ...dataFromLocalStorage[id], list: value };
  localStorage.setItem("List Items", JSON.stringify(dataFromLocalStorage));
  loadingData();
}

function updateList(e, i) {
  if (e.target.innerText === "Save") {
    savingUpdatedData(
      i,
      e.target.previousElementSibling.previousElementSibling.value
    );
    e.target.innerText = "Update";
    loadingData();
    return;
  }
  e.target.previousElementSibling.previousElementSibling.style.display =
    "block";
  e.target.previousElementSibling.style.display = "none";
  e.target.previousElementSibling.style.display = "none";
  e.target.nextElementSibling.style.display = "none";
  e.target.innerText = "Save";
}

function removeList(i) {
  let dataFromLocalStorage = JSON.parse(localStorage.getItem("List Items"));
  dataFromLocalStorage.splice(i, 1);
  localStorage.setItem("List Items", JSON.stringify(dataFromLocalStorage));
  loadingData();
}
