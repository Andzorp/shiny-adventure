document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.dropdown-content a');
    const filterHeader = document.getElementById('filter-header');
    
    // Function to update the header text
    const updateHeader = (filterText) => {
      filterHeader.textContent = filterText ? `Showing ${filterText} recipes` : 'Showing all recipes';
    };
  
    // Add event listener to filter links
    filterLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const filterValue = link.getAttribute('data-filter');
        const filterText = link.textContent;
        updateHeader(filterText);
        // Call a function to apply the filter here
        applyFilter(filterValue);
      });
    });
  
    // Apply initial header text based on current filter
    const initialFilter = document.querySelector('.dropdown-content a.active');
    updateHeader(initialFilter ? initialFilter.textContent : '');
  });
  
  // Example function to apply the filter (you'll need to implement this based on your needs)
  const applyFilter = (filterValue) => {
    // Logic to filter recipe cards
    console.log(`Applying filter: ${filterValue}`);
    // Example: Add a class to filter items
    // document.querySelectorAll('.recipe-card').forEach(card => {
    //   card.style.display = card.dataset.category === filterValue || filterValue === 'all' ? '' : 'none';
    // });
  };
  