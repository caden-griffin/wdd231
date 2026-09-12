const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.textContent = mainnav.classList.contains('show') ? '✕' : '☰';
});