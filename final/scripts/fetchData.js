export async function fetchRestaurants() {
  try {
    const response = await fetch('data/restaurants.json');
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}