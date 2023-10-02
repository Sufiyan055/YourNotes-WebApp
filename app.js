const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// getting localStorage notes if exist and parsing them to js object else passing an empty array to notes.

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
    <div class="details">
      <p class="TitleNp">${note.title}</p>
      <span
        >${note.description}</span
      >
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="setting">
        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
        <ul class="menu">
        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
        <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
    <p onclick="viewNote(${index}, '${note.title}', '${note.description}')" class="clicktoview">View Note</p>
  </li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    //removing show class from the setting menu on document click
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note");
  if (!confirmDel) return;
  notes.splice(noteId, 1); // removing notes from array
  // saving updated notes to localstorge
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update a Note";
  popupTitle.innerText = "Update a Note";
}

function viewNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Note";
  popupTitle.innerText = "Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});

/*  */
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("note");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element
      .getElementsByClassName("TitleNp")[0]
      .innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
