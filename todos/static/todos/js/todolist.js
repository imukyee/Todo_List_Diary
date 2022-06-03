const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

let toDos = []

function deleteToDo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((item) => item.id !== parseInt(li.id));
  li.remove();
  saveToDos();
}

function togglebutton(event) {
  const button = event.target;
  const li = button.parentElement;
  const span = li.querySelector("span");
  if (button.textContent === "🔲") {
    button.innerText = "✔";
    toDos.forEach((item) => {
      if (item.id === parseInt(li.id)) {
        item.check = 1
        span.classList.add("done")
      }
    });
  }
  else {
    button.innerText = "🔲";
    toDos.forEach((item) => {
      if (item.id === parseInt(li.id)) {
        item.check = 0
        span.classList.remove("done")
      }
    });
  }
  saveToDos();
}

function paintToDo(newToDoObj) {
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  const span = document.createElement("span");
  span.innerText = newToDoObj.text
  const button1 = document.createElement("button");
  const button2 = document.createElement("button");

  if (newToDoObj.check) {
    button1.innerText = "✔";
    span.classList.add("done")
  }
  else {
    button1.innerText = "🔲"
    span.classList.remove("done")
  }

  button1.addEventListener("click", togglebutton);

  button2.innerText = "❌"
  button2.addEventListener("click", deleteToDo);
  
  li.appendChild(button1);
  li.appendChild(span);
  li.appendChild(button2);
  toDoList.appendChild(li);
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function handleToSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    "text": newToDo,
    "id": Date.now(),
    "check": 0,
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToSubmit);

const savedToDos = localStorage.getItem("todos");

console.log('하이')

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}