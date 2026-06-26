const itemsCount = document.getElementById("items-count");
const toggleModeBtn = document.getElementById("toggle-mode");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");

let current = localStorage.getItem("currentFilter") || "all";

getSavedItems();

setCurrentFilter(current);
updateCurrentFilter();

//  update number of items left on page load time
updateItemsCount();

//  Add new todo item event handler
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTodo(todoInput.value);
    todoInput.value = "";
    updateCurrentFilter();
    saveItemsLocally();
});

//  Toggle mode event handler
toggleModeBtn.addEventListener("click", () => {
    if(document.body.classList.contains("light-mode")) {
        document.body.classList.remove("light-mode");
        toggleModeBtn.innerHTML = '<img src="./images/icon-sun.svg">';
    } else {
        document.body.classList.add("light-mode");
        toggleModeBtn.innerHTML = '<img src="./images/icon-moon.svg">';
    }
});

//  Check & delete todo items event handler 
listContainer.addEventListener("click", (e) => {
    //  Check todo item
    if(e.target.matches(".check-btn")) {
        e.target.parentElement.classList.toggle("completed");
        updateItemsCount();
        updateCurrentFilter();
        saveItemsLocally();
    } else if(e.target.matches(".check-btn img")) {
        e.target.parentElement.parentElement.classList.toggle("completed");
        updateItemsCount();
        updateCurrentFilter();
        saveItemsLocally();
    }

    //  Delete todo item 
    if(e.target.matches(".delete-btn")) {
        e.target.parentElement.remove();
        updateItemsCount();
        saveItemsLocally();
    } else if (e.target.matches(".delete-btn img")) {
        e.target.parentElement.parentElement.remove();
        updateItemsCount();
        saveItemsLocally();
    }
});

//  Clear completed items button event handler
clearCompletedBtn.addEventListener("click", () => {
    document.querySelectorAll(".todo-item.completed").forEach(item => item.remove());
    saveItemsLocally();
});

//  Filters event handling
allBtn.addEventListener("click", () => {
    setCurrentFilter("all");
    updateCurrentFilter();
});

activeBtn.addEventListener("click", () => {
    setCurrentFilter("active");
    updateCurrentFilter();
});

completedBtn.addEventListener("click", () => {
    setCurrentFilter("completed");
    updateCurrentFilter();
});

//  Update count function
function updateItemsCount() {
    let count = document.querySelectorAll(".list-container .todo-item:not(.completed)").length;
    itemsCount.innerText = `${count} item(s) left`;
}

//  Add new todo item function
function addNewTodo(item, completed = false) {
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-item");

    if(completed) {
        todoContainer.classList.add("completed");
    }

    let todoText = document.createElement("p");
    todoText.textContent = `${item}`;

    let checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");

    checkBtn.innerHTML = '<img src="./images/icon-check.svg">';

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<img src="./images/icon-cross.svg">';

    todoContainer.appendChild(checkBtn);
    todoContainer.appendChild(todoText);
    todoContainer.appendChild(deleteBtn);

    listContainer.appendChild(todoContainer);

    updateItemsCount();
}

//  Set the current filter of todo list
function setCurrentFilter(filter) {
    current = filter;

    localStorage.setItem("currentFilter", current);
    if(filter == "all") {
        allBtn.classList = "btn current";
        activeBtn.classList = "btn";
        completedBtn.classList = "btn";
    } else if (filter == "active") {
        allBtn.classList = "btn";
        activeBtn.classList = "btn current";
        completedBtn.classList = "btn";
    } else {
        allBtn.classList = "btn";
        activeBtn.classList = "btn";
        completedBtn.classList = "btn current";
    }
}

//  Update current filter in the layout
function updateCurrentFilter() {
    if(current == "all") {
        document.querySelectorAll(".todo-item").forEach(item => item.style.display = "flex");
    } 
    
    else if(current == "active") {
        document.querySelectorAll(".todo-item:not(.completed)").forEach(item => item.style.display = "flex");

        document.querySelectorAll(".todo-item.completed").forEach(item => item.style.display = "none");
    } 
    
    else {
        document.querySelectorAll(".todo-item.completed").forEach(item => item.style.display = "flex");

        document.querySelectorAll(".todo-item:not(.completed)").forEach(item => item.style.display = "none");
    }
}

function saveItemsLocally() {
    let items = [];
    listContainer.querySelectorAll(".todo-item").forEach(item => {
        let itemInfo = {
            paragraph: item.querySelector("p").textContent,
            completed: item.classList.contains("completed"),
        }

        items.push(itemInfo);
    });

    localStorage.setItem("list", JSON.stringify(items));
}

function getSavedItems() {
    let savedList = localStorage.getItem("list");

    if(savedList) {
        listContainer.innerHTML = "";
        JSON.parse(localStorage.getItem("list")).forEach(item => {
            addNewTodo(item.paragraph, item.completed);
        });       
    }

 }