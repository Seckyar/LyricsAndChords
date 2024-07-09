loadArtists();
document.getElementById('search-bar').addEventListener('input', filterArtists);

function loadArtists() {
  fetch('artists.json')
      .then(response => response.json())
      .then(artists => {
          allArtists = artists;
          displayArtists(allArtists); // Display all artists by default
      });
}



function displayArtists(artists) {
  const artistListElement = document.getElementById('artist-list');
  artistListElement.innerHTML = '';
  artists.forEach(artist => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.id='List';
      a.textContent = artist.name;
      a.href = 'artist.html?name=' + encodeURIComponent(artist.name);
      li.appendChild(a);
      artistListElement.appendChild(li);
  });
}



function filterArtists() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const filteredArtists = allArtists.filter(artist => artist.name.toLowerCase().includes(query));

  displayArtists(filteredArtists);
}

function loadArtistDetail() {
  const params = new URLSearchParams(window.location.search);
  const artistName = params.get('name');

  if (!artistName) {
      document.getElementById('artist-detail').innerHTML = '<p>Artist not found</p>';
      return;
  }

  fetch('artists.json')
      .then(response => response.json())
      .then(artists => {
          const artist = artists.find(a => a.name === artistName);
          if (artist) {
              document.getElementById('artist-name').textContent = artist.name;
              document.getElementById('artist-image').src = artist.image;
              document.getElementById('artist-bio').textContent = artist.bio;
              loadSongsByArtist(artist.name);
          } else {
              document.getElementById('artist-detail').innerHTML = '<p>Artist not found</p>';
          }
      });
}