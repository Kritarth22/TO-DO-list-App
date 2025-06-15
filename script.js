console.log("hello");

const addBtn = document.getElementById("add-btn");
const deleteBtn = document.getElementById("delete-btn");
const todoList = document.getElementById("todo-list");
const popupInput = document.getElementById("popup-input");

// Show input popup when add is clicked
addBtn.addEventListener("click", () => {
  popupInput.style.display = "block";
  popupInput.style.height = "20%";
  popupInput.style.width = "80%";
  popupInput.style.top = "50%";
  popupInput.style.left = "50%";
  popupInput.style.transform = "translate(-50%, -50%)";
  popupInput.style.backgroundColor = "#46404b";
  popupInput.focus();
});

// Add task on Enter
popupInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // prevent new line
    const taskText = popupInput.value.trim();
    if (taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;
        li.setAttribute("draggable", "true");
        li.classList.add("todo-item");

        // Enable dragging
        li.addEventListener("dragstart", () => li.classList.add("dragging"));
        li.addEventListener("dragend", () => li.classList.remove("dragging"));

        // Allow editing on click
        li.addEventListener("click", () => {
        li.setAttribute("contenteditable", "true");
        li.focus();
        });

      // Stop editing on blur
        li.addEventListener("blur", () => {
        li.removeAttribute("contenteditable");
        });

        // Stop editing on Enter
        li.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            li.removeAttribute("contenteditable");
            li.blur();
        }
        });
        todoList.appendChild(li);
    }
    popupInput.value = "";
    popupInput.style.display = "none";
  }
});

// Delete button drag-drop handling
deleteBtn.addEventListener("dragover", (e) => {
  e.preventDefault();
  deleteBtn.classList.add("drag-over");
});

deleteBtn.addEventListener("dragleave", () => {
  deleteBtn.classList.remove("drag-over");
});

deleteBtn.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedItem = document.querySelector(".dragging");
  if (draggedItem) {
    draggedItem.remove();
  }
  deleteBtn.classList.remove("drag-over");
});

// Hide popup when clicking outside of it
document.addEventListener("click", (e) => {
  const isClickInsideInput = popupInput.contains(e.target);
  const isClickOnAddBtn = addBtn.contains(e.target);

  if (!isClickInsideInput && !isClickOnAddBtn) {
    popupInput.style.display = "none";
  }
});
