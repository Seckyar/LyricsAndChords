document.addEventListener('DOMContentLoaded', function() {
    loadArtistDetail();
    document.getElementById('search-bar').addEventListener('input', filterArtistSongs);
});

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

function loadSongsByArtist(artistName) {
  fetch('songs.json')
      .then(response => response.json())
      .then(songs => {
          allSongs = songs;
          const artistSongs = allSongs.filter(song => song.artist === artistName);
          displayArtistSongs(artistSongs); // Display all songs by default
      });
  const artistSongs = allSongs.filter(song => song.artist === artistName);
  displayArtistSongs(artistSongs);
}

function filterArtistSongs() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const artistName = document.getElementById('artist-name').textContent;
  const filteredSongs = allSongs.filter(song => song.artist === artistName && song.title.toLowerCase().includes(query));

  displayArtistSongs(filteredSongs);
}

function displayArtistSongs(songs) {
  const artistSongListElement = document.getElementById('artist-song-list');
  artistSongListElement.innerHTML = '';
  if(songs.length===0){
    document.getElementById('message').style.display='block';
  }else{
    document.getElementById('message').style.display='none';
  }
  songs.forEach(song => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.id='List';
      a.textContent = song.title;
      a.href = 'song.html?title=' + encodeURIComponent(song.title)+'&artist='+encodeURIComponent(song.artist);
      li.appendChild(a);
      artistSongListElement.appendChild(li);
  });
}