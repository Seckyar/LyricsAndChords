document.addEventListener('DOMContentLoaded', function() {
    displayFavorites();
});

function displayFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesListElement = document.getElementById('favorites-list');
  favoritesListElement.innerHTML = '';
  favorites.forEach(song => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.id='List';
      a.textContent = song.title;
      a.href = 'song.html?title=' + encodeURIComponent(song.title) + '&artist='+encodeURIComponent(song.artist);
      li.appendChild(a);
      favoritesListElement.appendChild(li);
  });
}

