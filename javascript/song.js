document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const artist = urlParams.get('artist');
  const title = urlParams.get('title');

  fetch('songs.json')
      .then(response => response.json())
      .then(songs => {
        const artistName = songs.filter(s => s.artist === artist);
        console.log(artistName);
        const song = artistName.find(s => s.title === title);

              if (song) {
                  document.getElementById('song-title').textContent = song.title;
                  document.getElementById('song-artist').textContent = artist;
                  document.getElementById('song-image').src = song.image;
                  
                  const favorites = getFavorites();
                  const isFavorite = favorites.some(fav => fav.artist === artist && fav.title === title);
                  const favoriteButton = document.createElement('button');
                  
                  if (isFavorite) {
                      favoriteButton.textContent = 'Remove from Favorites';
                      favoriteButton.addEventListener('click', () => {
                          removeFromFavorites(artist, title);
                          favoriteButton.textContent = 'Add to Favorites';
                      });
                  } else {
                      favoriteButton.textContent = 'Add to Favorites';
                      favoriteButton.addEventListener('click', () => {
                          addToFavorites({ artist: artist, title: title });
                          favoriteButton.textContent = 'Remove from Favorites';
                      });
                  }
  
                  document.body.appendChild(favoriteButton);
              } else {
                  console.error('Song not found');
              }
      })
});

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function addToFavorites(song) {
  const favorites = getFavorites();
  favorites.push(song);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function removeFromFavorites(artist, title) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => !(fav.artist === artist && fav.title === title));
  localStorage.setItem('favorites', JSON.stringify(favorites));
}