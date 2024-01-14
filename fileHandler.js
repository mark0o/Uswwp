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

