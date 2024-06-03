import { tareas } from './data_todo.js'; 

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

let todo = []; 

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  loadTasks(); 
  displayTasks(); 
});

function loadTasks() {
  todo = tareas.map(tarea => ({
      text: tarea.texto,
      disabled: !tarea.estado
  }));
}

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = item.disabled;
    checkbox.addEventListener("change", () => toggleTask(index));

    const text = document.createElement("span");
    text.textContent = item.text;
    text.className = item.disabled ? "text disabled" : "text";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
  todoCount.textContent = `${todo.length} pendientes`;
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  displayTasks();
}

function deleteTask(index) {
  todo.splice(index, 1); 
  displayTasks(); 
}

function deleteAllTasks() {
  todo = [];
  displayTasks();
}
