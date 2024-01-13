document.addEventListener("keydown", function (event) {
  if (event.code === "KeyS" && event.ctrlKey) {
    event.preventDefault();
    save();
  }
  if (event.code === "KeyE" && event.ctrlKey) {
    event.preventDefault();
    exprt();
  }
  if (event.code === "KeyN" && event.ctrlKey) {
    event.preventDefault();
    newFile();
  }
  if (event.code === "KeyO" && event.ctrlKey) {
    event.preventDefault();
    open();
  }
  if (event.code === "KeyZ" && event.ctrlKey) {
    event.preventDefault();
    performAction("undo");
  }
  if (event.code === "KeyY" && event.ctrlKey) {
    event.preventDefault();
    performAction("redo");
  }
});

const editor = document.getElementById("editor");
const boldButton = document.getElementById("boldButton");
const italicButton = document.getElementById("italicButton");
const underlineButton = document.getElementById("underlineButton");
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const orderedListButton = document.getElementById("orderedListButton");
const unorderedListButton = document.getElementById('unorderedListButton');
const alignRightButton = document.getElementById("alignRightButton");
const alignCenterButton = document.getElementById('alignCenterButton');
const alignLeftButton = document.getElementById('alignLeftButton');
const alignFullButton = document.getElementById('alignFullButton');
const titleButton = document.getElementById('titleButton');
const textButton = document.getElementById('textButton');

function performAction(command, range) {
  document.execCommand(command, false, null);
}

function setTitle(size) {
  document.execCommand("formatblock", false, size);
}
function saveSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0);
  }
  return null;
}
function restoreSelection(range) {
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

boldButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("bold");
  restoreSelection(selection);
});

italicButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("italic");
  restoreSelection(selection);
});

underlineButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("underline");
  restoreSelection(selection);
});

orderedListButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("insertOrderedList");
  restoreSelection(selection);
});

unorderedListButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("insertUnorderedList");
  restoreSelection(selection);
});

alignRightButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("justifyRight");
  restoreSelection(selection);
});

alignCenterButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("justifyCenter");
  restoreSelection(selection);
});

alignLeftButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("justifyLeft");
  restoreSelection(selection);
});

undoButton.addEventListener("click", function () {
  const selection = saveSelection();
  performAction("undo");
  restoreSelection(selection);
});

redoButton.addEventListener("click", function () {
    const selection = saveSelection();
  performAction("redo");
  restoreSelection(selection);
});

titleButton.addEventListener("click", function () {
  const selection = saveSelection();
  setTitle("h1");
  restoreSelection(selection);
});

textButton.addEventListener("click", function () {
    const selection = saveSelection();
  setTitle("p");
  restoreSelection(selection);
});
