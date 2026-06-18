const itemsCount = document.getElementById("items-count");


updateItemsCount();


function updateItemsCount() {
    count = document.querySelectorAll(".list-container .todo-item").length;
    itemsCount.innerText = `${count} item(s) left`;
}