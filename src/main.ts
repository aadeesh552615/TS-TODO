import "./style.css";

interface toDo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

let tasks: Array<toDo> = [];
const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;
const myform = document.querySelector("#myForm") as HTMLFormElement;
const input = document.querySelector("form > input") as HTMLInputElement;

myform.onsubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const task: string = input.value;

  const newTask: toDo = {
    title: task,
    isCompleted: false,
    id: Math.floor(Math.random() * 100).toString(),
  };
  tasks.push(newTask);
  input.value = "";
  renderToDo(tasks);
};

const generateToDoItem = (todoItem: toDo) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  //checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.className = "complete-btn";
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = todoItem.isCompleted;
  checkBox.onchange = () => {
    tasks.find((item) => {
      if (item.id === todoItem.id) {
        item.isCompleted = checkBox.checked;
      }
    });
    checkBox.checked ? (p.className = "textCut") : "";
  };

  //delete button
  const deleteBtn: HTMLButtonElement = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "X";
  deleteBtn.onclick = () => {
    deleteTodo(todoItem.id);
  };

  //title
  const p: HTMLParagraphElement = document.createElement("p");
  if (todoItem.isCompleted) {
    p.className = "textCut";
  } else {
    p.className = "todo-text";
  }
  p.innerText = todoItem.title;

  todo.append(checkBox, p, deleteBtn);

  todoContainer.append(todo);
};

const deleteTodo = (id: string) => {
  const idx = tasks.findIndex((item) => item.id === id);
  tasks.splice(idx, 1);
  renderToDo(tasks);
};

const renderToDo = (tasks: toDo[]) => {
  todoContainer.innerText = "";
  tasks.forEach((item) => {
    console.log(item);
    generateToDoItem(item);
  });
};
