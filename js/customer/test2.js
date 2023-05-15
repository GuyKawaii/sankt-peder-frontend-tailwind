function makeBigger() {
    var myButton = document.getElementById("myButton");
    if (myButton.style.fontSize == "24px") {
        myButton.style.fontSize = "16px";
        myButton.innerHTML = "Bestil bord nu";
    } else {
        myButton.style.fontSize = "24px";
        myButton.innerHTML = "Tak for din bestilling!";
    }
}
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var myButton = document.getElementById("myButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.top = "50px";
    } else {
        myButton.style.top = "50%";
    }
}


