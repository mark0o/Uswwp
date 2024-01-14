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
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const orderedListButton = document.getElementById("orderedListButton");
const unorderedListButton = document.getElementById("unorderedListButton");
const alignRightButton = document.getElementById("alignRightButton");
const alignCenterButton = document.getElementById("alignCenterButton");
const alignLeftButton = document.getElementById("alignLeftButton");
const alignFullButton = document.getElementById("alignFullButton");
const titleButton = document.getElementById("titleButton");
const textButton = document.getElementById("textButton");
const themeButton = document.getElementById("themeButton");

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

themeButton.addEventListener("click", function () {
  const current = themeButton.innerHTML;
  const body = document.querySelector("body");
  if (current === "light_mode") {
    themeButton.innerHTML = "dark_mode";
    body.style.backgroundColor = "var(--background-colour-main-dark)";
    body.style.color = "#fff";
  } else {
    themeButton.innerHTML = "light_mode";
    body.style.backgroundColor = "var(--background-colour-main)";
    body.style.color = "#000";
  }
});

function openHtml() {
  text = document.getElementById("editor").innerHTML;
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teleprompter</title>
    </head>
  
  <body>
    <script>const speed = prompt("Please enter the spped:");</script>
    <span>You can press the spacebar to pause and continue scrolling. credits to <a
        href="https://codepen.io/startupsandcode/pen/MmXWaO">John Mann</a> for making this</span>
    <div class="container">
      <span onclick="toggleFullScreen()" id="fullscreen" class="sticky-element material-symbols-outlined">
        fullscreen
      </span>
    </div>
    <span class="icon-wrap">
    </span>
    <div class="text" contentEditable="true">${text}</div>
    <p>END</p>
  
  
  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
      integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
      crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://use.typekit.net/npb5nui.js"></script>
    <script>try { Typekit.load({ async: true }); } catch (e) { }</script>
    <script>$(window).scrollTop(0);
  
      let play = true;
      let currentScroll = 0;
      let scroller = setInterval(scroll, speed);
  
      function scroll() {
        if (play == true) {
          currentScroll = $(window).scrollTop();
          if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            $(window).scrollTop(0);
          } else {
            $(window).scrollTop(currentScroll + 1);
          }
        }
      }
  
      function keyDownTextField(e) {
        const keyCode = e.keyCode;
        if (keyCode == 32) {
          event.preventDefault();
          play = !play;
          return false;
        }
      }
      document.addEventListener("keydown", keyDownTextField, false);
      function toggleFullScreen() {
        const doc = window.document;
        const docEl = doc.documentElement;
        const button = document.getElementById("fullscreen")
  
        const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);
          button.innerHTML = "fullscreen_exit"
        } else {
          cancelFullScreen.call(doc);
          button.innerHTML = "fullscreen"
        }
      }
    </script>
  
    <style>
      body {
        background: black;
        padding: 60px;
        margin: 0;
      }
  
      span {
        color: #fff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
  
      .text,
      p {
        font-family: sans-serif;
        font-size: 80px;
        line-height: 120px;
        margin-bottom: 60px;
        color: rgba(255, 255, 255, 0.9);
        font-family: ratio, sans-serif;
        font-style: normal;
        font-weight: 500;
        transition: all 0.2s;
  
        &:focus {
          outline: none;
        }
      }
  
      .container {
        position: relative;
      }
  
      .sticky-element {
        background-color: #000000cf;
        border-radius: 16px;
        font-size: 80px;
        cursor: pointer;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1;
      }
  
      /* fallback */
  @font-face {
    font-family: 'Material Symbols Outlined';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v156/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOej.woff2) format('woff2');
  }
  
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 40px;
    line-height: 80px;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }
    </style>
  </body>
  
  </html>
  `;
  const height = screen.height;
  const width = screen.width;
  const features = `width=${width},height=${height},resizable=yes,scrollbars=yes`;
  let newWindow = window.open("", "_blank", features);
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  } else {
    alert("Unable to open a new window. Please check your browser settings.");
  }
}
