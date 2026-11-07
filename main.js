const tasks = [
  {
    title: "Design a website",
    complete: true,
  },
  {
    title: "Fix bugs",
    complete: true,
  },
  {
    title: "UI design",
    complete: false,
  },
];

const taskList = document.querySelector("#task-list");

function renderTasks() {
  const html = tasks
    .map((task) => {
      return `<li class="task-item ${task.complete ? "completed" : ""}">
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

renderTasks();
