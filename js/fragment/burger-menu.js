const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')

btn.addEventListener('click', () => {
    btn.classList.toggle('open')
    nav.classList.toggle('flex')
    nav.classList.toggle('hidden')
})

window.onresize = function () {
    const navbar = document.querySelector('#navbar');
    const bodyContent = document.querySelector('#navbar-padding');

    let navbarHeight = navbar.offsetHeight;

    bodyContent.style.paddingTop = navbarHeight + 'px';
};
