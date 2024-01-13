const userAgent = navigator.userAgent;
const cover = document.getElementById("cover")

if (userAgent.match(/Android/i)) {
    console.log("Device is a phone or tablet");
    cover.style.visibility = "visible"

} else if (userAgent.match(/iPad|iPhone|iPod/i)) {
    console.log("Device is an iPhone or iPad");
    cover.style.visibility = "visible"
} else if (userAgent.match(/Windows|Mac|Linux/i)) {
    console.log("Device is a computer");
    cover.style.visibility = "hidden"
} else {
    console.log("Device type is unknown or not detected");
}