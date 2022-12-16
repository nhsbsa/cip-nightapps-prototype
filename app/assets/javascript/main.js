// ES6 or Vanilla JavaScript

let back = false;

function swapSides() {
    if (back) {
        document.getElementById("prescription-image").src = "/images/E000001NE02_side1.jpg";
        document.getElementById("swap-sides").innerHTML = "Show Back";
    } else {
        document.getElementById("prescription-image").src = "/images/E000001NE02_side2.jpg";
        document.getElementById("swap-sides").innerHTML = "Show Front";
    }

    back = !back;
}