const tasks = JSON.parse(localStorage.getItem("tasks"));

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const submitBtn = document.querySelector("#submit");
const taskList = document.querySelector("#task-list");

function renderTasks() {
  if (!tasks.length) {
    taskList.innerHTML = `<li class="no-task">There is no task is available!</li>`;
    return;
  }

  const html = tasks
    .map((task, index) => {
      return `<li class="task-item ${task.complete ? "completed" : ""}" data-index="${index}">
          <span class="task-title">${task.title}</span>
          <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${task.complete ? "Mark as undone" : "Mark as done"}</button>
            <button class="task-btn delete">Delete</button>
          </div>
        </li>`;
    })
    .join("");

  taskList.innerHTML = html;
}

function addTask(e) {
  e.preventDefault();

  const value = todoInput.value.trim();

  if (!value) {
    return alert("Please right something!");
  }

  if (checkDuplicate(value)) {
    alert("You already have this task. Please use different title!");
    return;
  }

  tasks.push({
    title: value,
    complete: false,
  });

  todoInput.value = "";

  renderTasks();
  saveTasks();
}

function handleTaskActions(e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = +taskItem.dataset.index;
  const task = tasks[taskIndex];

  //   Edit
  if (e.target.closest(".edit")) {
    let value = prompt("Please enter your adjustment!", task.title);

    if (value === null) return;
    value = value.trim();

    if (!value) {
      return alert("Task adjustment cannot be empty!");
    }

    if (checkDuplicate(value, taskIndex)) {
      alert("You already have this task. Please use different title!");
      return;
    }
    task.title = value;
    renderTasks();
    saveTasks();
    return;
  }

  //   Mark as done/undone
  if (e.target.closest(".done")) {
    task.complete = !task.complete;
    renderTasks();
    saveTasks();
    return;
  }

  //   Delete
  if (e.target.closest(".delete")) {
    if (confirm(`Are you sure want to delete ${task.title} ?`)) {
      tasks.splice(taskIndex, 1);
      renderTasks();
      saveTasks();
    }
  }
}

function checkDuplicate(taskTitle, currentIndex = -1) {
  return tasks.some(
    (task, index) =>
      task.title.toLowerCase() === taskTitle.toLowerCase() &&
      index !== currentIndex,
  );
}

function saveTasks() {
  return localStorage.setItem("tasks", JSON.stringify(tasks));
}

todoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);

renderTasks();
