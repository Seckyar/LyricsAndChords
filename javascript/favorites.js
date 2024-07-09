document.addEventListener('DOMContentLoaded', function() {
    loadFavorites();
    document.getElementById('search-bar').addEventListener('input', filteredSongs);
});

function loadFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  displayFavorites(favorites);
}

function displayFavorites(favorites) {
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

function filteredSongs() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const filteredSongs = favorites.filter(song => song.title.toLowerCase().includes(query));

  displayFavorites(filteredSongs);
}

