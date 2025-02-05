function toggleMenu() {
    var menu = document.querySelector("nav ul");
    menu.classList.toggle("active");
}
function changeBackground(image) {
    document.body.style.backgroundImage = `url('${image}')`;
}

function resetBackground() {
    document.body.style.backgroundImage = 'none';
}