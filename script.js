const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const filterLinks = document.querySelectorAll('.dropdown-content a');
const recipeCards = document.querySelectorAll('.recipe-card');

// Toggle sidebar visibility
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

// Close sidebar when clicking outside of it
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && !document.querySelector('.dropdown').contains(e.target)) {
    sidebar.classList.remove('show');
  }
});

// Filter recipe cards based on category
filterLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = e.target.getAttribute('data-filter');

    recipeCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

