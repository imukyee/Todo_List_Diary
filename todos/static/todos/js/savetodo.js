const toDoList = document.querySelector("#todo-list");
const submit = document.querySelector(".submit")

let toDos = []


function paintToDo(newToDoObj, index) {
  const li = document.createElement("li");
  li.id = newToDoObj.id;

  const input = document.createElement("input");
  const check_input = document.createElement("input");

  input.type = "text";
  const idx = String(index);
  input.name = `todo${idx}`;
  input.id = `todo${idx}`;
  input.value = newToDoObj.text;
  input.readOnly = true;

  check_input.type = "hidden"
  check_input.name = `check${idx}`
  check_input.id = `check${idx}`
  check_input.value = 0

  if (newToDoObj.check) {
    input.classList.add("done");
    check_input.value = 1;
  }

  li.appendChild(input);
  li.appendChild(check_input);
  toDoList.appendChild(li);
  console.log(check_input)
}

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function handleSubmit(event) {
  const input = document.createElement("input")
  input.type = "hidden"
  input.name = "todo_num"
  input.id = "todo_num"
  input.value = toDos.length;
  toDoList.appendChild(input);
}

const savedToDos = localStorage.getItem("todos");

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

submit.addEventListener("click", handleSubmit)