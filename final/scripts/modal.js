export function setupModal(dialogElement, restaurant) {
  const modalContent = dialogElement.querySelector('.modal-body');
  
  modalContent.innerHTML = `
    <h2>${restaurant.name}</h2>
    <p><strong>Cuisine:</strong> ${restaurant.cuisine}</p>
    <p><strong>Rating:</strong> ⭐ ${restaurant.rating} / 5.0</p>
    <p><strong>Price:</strong> ${restaurant.price}</p>
    <p><strong>Address:</strong> ${restaurant.address}</p>
    <p><strong>Description:</strong> ${restaurant.description}</p>
  `;
  
  dialogElement.showModal();
}