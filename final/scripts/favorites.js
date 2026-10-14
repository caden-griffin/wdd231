import { fetchRestaurants } from './fetchData.js';
import { getFavorites, removeFavorite } from './storage.js';
import { setupModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const favoritesGrid = document.getElementById('favorites-grid');
  const restaurantModal = document.getElementById('restaurant-modal');
  const closeModalBtn = document.getElementById('close-modal');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  const restaurants = await fetchRestaurants();
  const favoriteIds = getFavorites();
  
  const favoriteRestaurants = restaurants.filter(r => favoriteIds.includes(r.id));
  displayFavorites(favoriteRestaurants);

  function displayFavorites(items) {
    favoritesGrid.innerHTML = '';

    if (items.length === 0) {
      favoritesGrid.innerHTML = '<p>You have not saved any favorite restaurants yet.</p>';
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
              <button class="btn btn-primary remove-btn" data-id="${restaurant.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    favoritesGrid.innerHTML = templateList.join('');

    document.querySelectorAll('.details-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const restaurant = restaurants.find(r => r.id === id);
        setupModal(restaurantModal, restaurant);
      });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        removeFavorite(id);
        location.reload();
      });
    });
  }

  closeModalBtn.addEventListener('click', () => {
    restaurantModal.close();
  });
});