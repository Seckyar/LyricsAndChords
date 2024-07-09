displayFavorites();

function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesListElement = document.getElementById('favorites-list');
  favoritesListElement.innerHTML = '';
  favorites.forEach(title => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.id='List';
      a.textContent = title;
      a.href = 'song.html?title=' + encodeURIComponent(title);
      li.appendChild(a);
      favoritesListElement.appendChild(li);
  });
}