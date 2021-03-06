"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

const todoData = [];

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach(function (item, i) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = `<span class="text-todo">${item.value}</span>
                    <div class="todo-buttons">
                      <button class="todo-remove"></button>
                      <button class="todo-complete"></button>
                    </div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoComplete = li.querySelector(".todo-complete");
    todoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    const todoRemove = li.querySelector(".todo-remove");
    todoRemove.addEventListener("click", function () {
      li.remove();
      todoData.splice(i, 1);
      render();
    });
  });

  localStorage.setItem("todoData", JSON.stringify(todoData));
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value === "") {
    return;
  } else {
    const newTodo = {
      value: headerInput.value,
      complete: false,
    };
    todoData.push(newTodo);
  }



  render();
  headerInput.value = "";
});

let storedData = JSON.parse(localStorage.getItem("todoData"));
storedData.forEach(function (item) {
  todoData.push(item);
});

render();
