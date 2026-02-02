const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTaskToDOM(taskText, false);
  saveTask(taskText, false);
  taskInput.value = "";
});

function addTaskToDOM(text, completed) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = text;

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("task-actions");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = completed ? "Undo" : "Complete";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  actionsDiv.appendChild(completeBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actionsDiv);
  taskList.appendChild(li);

  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    const isCompleted = li.classList.contains("completed");
    completeBtn.textContent = isCompleted ? "Undo" : "Complete";
    updateTask(text, isCompleted);
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTask(text);
  });
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map(task =>
    task.text === text ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function deleteTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}
