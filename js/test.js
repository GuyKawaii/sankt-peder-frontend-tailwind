window.onscroll = function() {myFunction()};

function myFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementsByTagName("header")[0].className = "fade";
    } else {
        document.getElementsByTagName("header")[0].className = "";
    }
}
