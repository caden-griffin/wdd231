const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuButton.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
});

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const directoryContainer = document.querySelector('#directory-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const membersUrl = 'data/members.json';

async function getDirectoryData() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displayDirectory(data.members);
    } catch (error) {
        console.error(error);
    }
}

function displayDirectory(members) {
    directoryContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-tagline">${member.category} - ${member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Member'}</p>
                <p><strong>ADDRESS:</strong> ${member.address}</p>
                <p><strong>PHONE:</strong> ${member.phone}</p>
                <p><strong>URL:</strong> <a href="${member.website}" target="_blank">Visit Website</a></p>
            </div>
        `;

        directoryContainer.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    directoryContainer.classList.add('grid-view');
    directoryContainer.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.add('list-view');
    directoryContainer.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

getDirectoryData();