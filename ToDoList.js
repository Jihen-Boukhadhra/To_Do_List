

var taskInput = document.getElementById("new-task"); //Add a new task.
var addButton = document.getElementsByTagName("button")[0]; //first button


let tasks = [
  { value: "Do task 1", isComplete: false },
  { value: "Do task 2", isComplete: true },
];


if (localStorage.getItem("taskData")) {
  tasks = JSON.parse(localStorage.getItem("taskData"));
}


var createNewTaskElement = function (taskString, isComplete, taskIndex) {
  var listItem = document.createElement("li");
  var actionContainer = document.createElement("div");


  var checkBox = document.createElement("input"); //checkbx
  checkBox.type = "checkbox";
  checkBox.className = "chb";
  checkBox.onchange = () => {
  
    tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;
    render();
  };

 
  var label = document.createElement("label"); //label
  label.innerText = taskString;
  label.className = "label-container";
  label.htmlFor = "chb";


  var editInput = document.createElement("input"); //text
  editInput.type = "text";


  var editButton = document.createElement("button"); //edit button
  editButton.innerHTML = `<i class="ph-pencil"></i>`; //innerText encodes special characters, HTML does not.
  editButton.className = "btn-edit bg-button";
  editButton.onclick = function () {
    editTask(this, taskIndex);
  };

 
  var deleteButton = document.createElement("button"); 
  deleteButton.innerHTML = `<i class="ph-trash"></i>`;
  deleteButton.className = "btn-delete bg-button";
  deleteButton.onclick = () => {

    tasks.splice(taskIndex, 1);
    render();
  };

  if (isComplete) {
    listItem.className = "completed-task";
    checkBox.checked = true;
  } else {
    listItem.className = "incomplete-task";
  }

  actionContainer.className = "action-container";
  actionContainer.appendChild(editButton);
  actionContainer.appendChild(deleteButton);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(actionContainer);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");
  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a todo");
    return;
  }
 
  tasks.push({ value: task, isComplete: false });
  taskInput.value = "";
  render();
};


var editTask = function (that, taskIndex) {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = that.parentNode.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  const editButtonIcon = listItem.getElementsByClassName("btn-edit");
  if (containsClass) {
    if (editInput.value !== "") {
      tasks[taskIndex].value = editInput.value;
    } else {
      alert("Todo item new value cannot be blank.");
    }
    render();
  } else {
    console.log("ini jalan");
    editInput.value = label.innerText;
    editButtonIcon[0].innerHTML = `<i class="ph-check-bold"></i>`;
  }

  listItem.classList.toggle("editMode");
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};


addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") addTask();
});

var render = function () {
    let completedCount = 0;
    let pendingCount = 0;
  var headingTags = document.getElementsByTagName("h3");
  var incompleteTaskHolder = document.getElementById("incomplete-tasks"); 
  var completedTasksHolder = document.getElementById("completed-tasks"); 

  incompleteTaskHolder.innerHTML = "";
  completedTasksHolder.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const listItem = createNewTaskElement(
      tasks[i].value,
      tasks[i].isComplete,
      i
    );
    if (tasks[i].isComplete) {
      completedCount++;
      completedTasksHolder.appendChild(listItem);
    } else {
      incompleteTaskHolder.appendChild(listItem);
      pendingCount++;
    }
  }

  for (let element = 0; element < headingTags.length; element++) {
    if (headingTags.innerText.toLowerCase().includes("todo")) {
      headingTags.innerText = `Todo ${pendingCount}`;
    } else {
      headingTags.innerText = `Complet ${completedCount}`;
    }
  }

  localStorage.setItem("taskData", JSON.stringify(tasks));
};

render();
