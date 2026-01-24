let inputs1 = document.getElementById("in1");
let inputs2 = document.getElementById("in2");
let text = document.querySelector(".text");
let tasks = [];
window.addEventListener("DOMContentLoaded", loadTasks);

function Add() {
  if (inputs1.value === "" || inputs2.value === "") {
    alert("Please enter both task and date");
  } else {
    let taskObj = {
      task: inputs1.value,
      date: inputs2.value,
    };
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(taskObj);

    inputs1.value = "";
    inputs2.value = "";
  }
}

function createTask(taskObj) {
  let newEle = document.createElement("ul");

  newEle.innerHTML = ` <div class="task-content">
        <div class="task-box">${taskObj.task}</div>
        <div class="date-box">${taskObj.date}</div>
    </div>
    <i class="fa-solid fa-trash"></i>`;

  text.appendChild(newEle);
  newEle.querySelector("i").addEventListener("click", function () {
    newEle.remove();
    tasks = tasks.filter(
      (t) => t.task !== taskObj.task || t.date !== taskObj.date,
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => createTask(task));
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

inputs1.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    Add();
  }
});

inputs2.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    Add();
  }
});
