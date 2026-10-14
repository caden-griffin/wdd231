export function getFavorites() {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorite(restaurantId) {
  const favorites = getFavorites();
  if (!favorites.includes(restaurantId)) {
    favorites.push(restaurantId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(restaurantId) {
  let favorites = getFavorites();
  favorites = favorites.filter(id => id !== restaurantId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}