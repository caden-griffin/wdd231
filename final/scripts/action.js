document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const resultsList = document.getElementById('results-list');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  const params = new URLSearchParams(window.location.search);
  
  if (params.toString() === '') {
    resultsList.innerHTML = '<li>No submission data found.</li>';
    return;
  }

  let htmlContent = '';
  for (const [key, value] of params.entries()) {
    htmlContent += `<li><strong>${key}:</strong> ${value}</li>`;
  }

  resultsList.innerHTML = htmlContent;
});