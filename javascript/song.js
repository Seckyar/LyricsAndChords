loadSongDetail();

function loadSongDetail() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const artist = params.get('artist');

  if (!title) {
      document.getElementById('song-detail').innerHTML = '<p>Song not found</p>';
      return;
  }

  fetch('songs.json')
      .then(response => response.json())
      .then(songs => {
          const artistName = songs.filter(s => s.artist === artist);
          console.log(artistName);
          const song = artistName.find(s => s.title === title)
          if (song) {
              document.getElementById('song-title').textContent = song.title;
              document.getElementById('song-artist').textContent = 'Artist: ' + song.artist;
              document.getElementById('song-image').src = song.image;
          } else {
              document.getElementById('song-detail').innerHTML = '<p>Song not found</p>';
          }
      });
}