document.addEventListener('DOMContentLoaded', function() {
  loadSongs();
  document.getElementById('search-bar').addEventListener('input', filterContent);
});

function loadSongs() {
  fetch('songs.json')
      .then(response => response.json())
      .then(songs => {
          allSongs = songs;
          displaySongs(allSongs); // Display all songs by default
      });
}

function displaySongs(songs) {
  const songListElement = document.getElementById('song-list');
  songListElement.innerHTML = '';
  songs.forEach(song => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.id='List';
      a.textContent = song.title;
      a.href = 'song.html?title=' + encodeURIComponent(song.title)+'&artist='+encodeURIComponent(song.artist);
      li.appendChild(a);
      songListElement.appendChild(li);
  });
}

function filteredSongs() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const filteredSongs = allSongs.filter(song => song.title.toLowerCase().includes(query));

  displaySongs(filteredSongs);
}