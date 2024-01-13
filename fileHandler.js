function replaceElementHTML(parentElement, newHTML) {
  // Set the innerHTML property to replace the content with the new HTML string
  parentElement.innerHTML = newHTML;
}

function readFileContents(callback) {
  var input = document.createElement("input");
  input.type = "file";
  input.addEventListener("change", function () {
    var file = input.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        callback(event.target.result);
      };
      reader.readAsText(file);
    }
  });
  input.click();
}

function downloadFile(text, filename, customExtension) {
  const fullFilename = `${filename}.${customExtension}`;
  const blob = new Blob([text], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fullFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
//these 2 functions above were made by chat gpt, i was kinda too lazy to make them myself lol

function encodeText(text) {
  const encodedText = encodeURIComponent(text);
  const finalEncodedText = btoa(btoa(btoa(encodedText)));
  return finalEncodedText;
}

function decodeText(encodedText) {
  const decodedText = atob(atob(atob(encodedText)));
  const finalDecodedText = decodeURIComponent(decodedText);
  return finalDecodedText;
}

function save() {
  text = document.getElementById("editor").innerHTML;
  downloadFile(encodeText(text), "Untitled", "USWWAFF");
}

function openFile() {
  readFileContents(function (fileContents) {
    const html = decodeText(fileContents);
    var elmnt = document.getElementById("editor");
    replaceElementHTML(elmnt, html);
  });
}

function newFile() {
  if (confirm("Are you sure you want to create a new file?")) {
    var elmnt = document.getElementById("editor");
    replaceElementHTML(elmnt, "<p></p>");
  }
}

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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://use.typekit.net/npb5nui.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
<script>$(window).scrollTop(0);

        var play = true;
        var currentScroll = 0;
        var speed = 32;
        var scroller = setInterval(scroll, speed);
        
        function scroll() {
          if(play == true) {
            currentScroll = $(window).scrollTop();
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
              $(window).scrollTop(0);
            } else {
              $(window).scrollTop(currentScroll+1);
            }
          }
        }
        
        function keyDownTextField(e) {
          var keyCode = e.keyCode;
          if(keyCode==32) {
            event.preventDefault();
            play = !play;
            return false;
          } 
        }
        document.addEventListener("keydown", keyDownTextField, false);
        </script>
    
    
    <span>You can press the spacebar to pause and continue scrolling. credits to <a href="https://codepen.io/startupsandcode/pen/MmXWaO">John Mann</a> for making this</span>
    <div class="text" contentEditable="true">${text}</div>
    <p>END</p>
    
    <style>
    body {
      background: black;
      padding: 60px;
      margin: 0;
    }
    
    span{
        color: #fff;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .text, p {
      font-family: sans-serif;
      font-size: 80px;
      line-height: 120px;
      margin-bottom: 60px;
      color: rgba(255,255,255,0.9);
      font-family: ratio, sans-serif;
      font-style: normal;
      font-weight: 500;
      transition: all 0.2s;
      
      &:focus {
        outline: none;
      }
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
