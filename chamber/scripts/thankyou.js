const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuButton.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
});

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const urlParams = new URLSearchParams(window.location.search);
const resultsContainer = document.querySelector('#results');

function getParam(name) {
    return urlParams.get(name) || 'Not Provided';
}

const firstName = getParam('fname');
const lastName = getParam('lname');
const email = getParam('email');
const phone = getParam('phone');
const organization = getParam('organization');
const timestamp = getParam('timestamp');

let formattedDate = timestamp;
if (timestamp !== 'Not Provided') {
    try {
        formattedDate = new Date(timestamp).toLocaleString();
    } catch (e) {
        formattedDate = timestamp;
    }
}

if (resultsContainer) {
    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business/Organization:</strong> ${organization}</p>
        <p><strong>Application Timestamp:</strong> ${formattedDate}</p>
    `;
}