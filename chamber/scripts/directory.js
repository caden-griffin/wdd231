const jsonPath = 'data/members.json';
const container = document.getElementById('directory-container');
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuButton.classList.toggle('open');
});

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

async function fetchMembers() {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error('Network response failure');
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error processing member data:', error);
    }
}

function displayMembers(members) {
    container.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('section');
        
        let levelText = 'Member';
        if (member.membershipLevel === 2) levelText = 'Silver';
        if (member.membershipLevel === 3) levelText = 'Gold';
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline">${member.category} - <span class="lvl-${member.membershipLevel}">${levelText}</span></p>
            <div class="info-group">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
            </div>
        `;
        container.appendChild(card);
    });
}

gridBtn.addEventListener('click', () => {
    container.classList.add('grid-view');
    container.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    container.classList.add('list-view');
    container.classList.remove('grid-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

fetchMembers();