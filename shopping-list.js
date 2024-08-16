document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('#ingredients-list input[type="checkbox"]');
  const shoppingList = document.getElementById('shopping-list');
  const modal = document.getElementById('shopping-list-modal');
  const closeBtn = document.querySelector('.modal .close');
  const viewListBtn = document.getElementById('view-shopping-list');
  const goToMasterListBtn = document.getElementById('go-to-master-list');
  const masterShoppingList = document.getElementById('master-shopping-list'); // Ensure this ID matches
  const clearListBtn = document.getElementById('clear-list-btn'); // Ensure this ID matches
  const searchBar = document.getElementById('search-bar'); // Ensure this ID matches

  // Load previously added items from local storage
  const loadShoppingList = () => {
      const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
      shoppingList.innerHTML = ''; // Clear existing list
      items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          shoppingList.appendChild(listItem);
      });
  };

  loadShoppingList();

  // Add unchecked items to shopping list and show modal
  viewListBtn.addEventListener('click', () => {
      const itemsToAdd = [];
      checkboxes.forEach(checkbox => {
          if (!checkbox.checked) { // Only include unchecked items
              const item = checkbox.dataset.item;
              if (item && !itemsToAdd.includes(item)) {
                  itemsToAdd.push(item);
              }
          }
      });

      // Retrieve current items from local storage
      let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

      // Add new items to local storage, avoiding duplicates
      itemsToAdd.forEach(item => {
          if (!items.includes(item)) {
              items.push(item);
          }
      });

      localStorage.setItem('shoppingList', JSON.stringify(items));

      // Update the modal with the new shopping list
      loadShoppingList(); // Re-load to ensure it displays current items

      // Show the modal
      modal.style.display = 'block';
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  // Go to shopping list page
  goToMasterListBtn.addEventListener('click', () => {
      window.location.href = 'shopping-list.html';
  });

  // Load items from local storage and display them on the master shopping list page
  const loadMasterShoppingList = () => {
      const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
      masterShoppingList.innerHTML = ''; // Clear existing list
      items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
              ${item}
              <div>
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete</button>
              </div>
          `;
          masterShoppingList.appendChild(listItem);
      });
  };

  loadMasterShoppingList();

  // Clear all items from local storage and the list
  clearListBtn.addEventListener('click', () => {
      localStorage.removeItem('shoppingList');
      masterShoppingList.innerHTML = '';
  });

  // Search functionality
  searchBar.addEventListener('input', () => {
      const query = searchBar.value.toLowerCase();
      const items = masterShoppingList.querySelectorAll('li');
      items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? '' : 'none';
      });
  });

  // Edit item functionality
  masterShoppingList.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-btn')) {
          const listItem = event.target.closest('li');
          const itemText = listItem.firstChild.textContent.trim();
          const newItemText = prompt('Edit item:', itemText);
          if (newItemText) {
              const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
              const index = items.indexOf(itemText);
              if (index > -1) {
                  items[index] = newItemText;
                  localStorage.setItem('shoppingList', JSON.stringify(items));
                  loadMasterShoppingList();
              }
          }
      }

      // Delete item functionality
      if (event.target.classList.contains('delete-btn')) {
          const listItem = event.target.closest('li');
          const itemText = listItem.firstChild.textContent.trim();
          const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
          const index = items.indexOf(itemText);
          if (index > -1) {
              items.splice(index, 1);
              localStorage.setItem('shoppingList', JSON.stringify(items));
              loadMasterShoppingList();
          }
      }
  });
});
