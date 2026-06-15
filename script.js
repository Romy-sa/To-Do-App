const itemsCount = document.getElementById("items-count");
const toggleModeBtn = document.getElementById("toggle-mode");


updateItemsCount();

toggleModeBtn.addEventListener("click", () => {
    if(document.body.classList.contains("light-mode")) {
        document.body.classList.remove("light-mode");
        toggleModeBtn.innerHTML = `<img src="./images/icon-sun.svg">`;
    } else {
        document.body.classList.add("light-mode");
        toggleModeBtn.innerHTML = `<img src="./images/icon-moon.svg">`
    }
});

function updateItemsCount() {
    count = document.querySelectorAll(".list-container .todo-item").length;
    itemsCount.innerText = `${count} item(s) left`;
}