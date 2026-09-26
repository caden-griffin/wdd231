const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuButton.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
});

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const lat = '40.0378';
const lon = '-111.6618';
const apiKey = '01736a761901bf76ac94c82790576d3f';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }

        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastData.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const weatherIcon = document.getElementById('weather-icon');

    currentTemp.textContent = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2d.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('18:00:00')).slice(0, 3);

    dailyForecasts.forEach(day => {
        const dateObj = new Date(day.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');
        dayDiv.innerHTML = `
            <p><strong>${dayName}</strong></p>
            <p>${Math.round(day.main.temp)}&deg;F</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}

apiFetch();

const membersUrl = 'data/members.json';

async function getMembersData() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.getElementById('spotlights');
    spotlightsContainer.innerHTML = '';

    const qualifiedMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2 || member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');

    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p class="membership-level">${member.membershipLevel === 3 || member.membershipLevel === 'Gold' ? '⭐ Gold Member' : '🥈 Silver Member'}</p>
            <p>📞 ${member.phone}</p>
            <p>📍 ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        
        spotlightsContainer.appendChild(card);
    });
}

getMembersData();