import { fetchRestaurants } from './fetchData.js';
import { saveFavorite, getFavorites } from './storage.js';
import { setupModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const restaurantGrid = document.getElementById('restaurant-grid');
  const searchInput = document.getElementById('search-input');
  const cuisineFilter = document.getElementById('cuisine-filter');
  const restaurantModal = document.getElementById('restaurant-modal');
  const closeModalBtn = document.getElementById('close-modal');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  const restaurants = await fetchRestaurants();
  displayRestaurants(restaurants);

  searchInput.addEventListener('input', filterAndDisplay);
  cuisineFilter.addEventListener('change', filterAndDisplay);

  function filterAndDisplay() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCuisine = cuisineFilter.value;

    const filtered = restaurants.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm) || item.cuisine.toLowerCase().includes(searchTerm);
      const matchesCuisine = selectedCuisine === '' || item.cuisine === selectedCuisine;
      return matchesSearch && matchesCuisine;
    });

    displayRestaurants(filtered);
  }

  function displayRestaurants(items) {
    restaurantGrid.innerHTML = '';
    
    if (items.length === 0) {
      restaurantGrid.innerHTML = '<p>No restaurants found.</p>';
      return;
    }

    const templateList = items.map(restaurant => {
      return `
        <div class="restaurant-card">
          <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image" loading="lazy">
          <div class="restaurant-info">
            <div class="restaurant-header">
              <h3 class="restaurant-name">${restaurant.name}</h3>
              <span class="restaurant-cuisine">${restaurant.cuisine}</span>
            </div>
            <div class="restaurant-details">
              <span class="restaurant-rating">⭐ ${restaurant.rating}</span>
              <span>${restaurant.price}</span>
            </div>
            <p>${restaurant.description.substring(0, 70)}...</p>
            <div class="card-actions">
              <button class="btn btn-secondary details-btn" data-id="${restaurant.id}">Details</button>
              <button class="btn btn-primary fav-btn" data-id="${restaurant.id}">Favorite</button>
            </div>
          </div>
        </div>
      `;
    });

    restaurantGrid.innerHTML = templateList.join('');

    document.querySelectorAll('.details-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const restaurant = restaurants.find(r => r.id === id);
        setupModal(restaurantModal, restaurant);
      });
    });

    document.querySelectorAll('.fav-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        saveFavorite(id);
        alert('Added to favorites!');
      });
    });
  }

  closeModalBtn.addEventListener('click', () => {
    restaurantModal.close();
  });
});