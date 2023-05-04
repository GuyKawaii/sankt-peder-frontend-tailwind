
$(function(){
    $("#nav-placeholder").load("../html/***");
    $("#nav-placeholder-operator").load("../html/***");
    $("#nav-placeholder-shop").load("../html/***");
    $("#nav-placeholder-ticket").load("../html/***");
    $("#nav-placeholder-manager").load("../html/***");
    $("#logout-button").load("../html/***");

});

function myFunction() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}