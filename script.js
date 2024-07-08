document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('song-list')) {
        loadSongs();
        loadArtists();
        document.getElementById('search-bar').addEventListener('input', filterContent);
    } else if (document.getElementById('artist-list') && !document.getElementById('song-list')) {
        loadArtists();
        document.getElementById('search-bar').addEventListener('input', filterArtists);
    } else if (document.getElementById('artist-song-list')) {
        loadArtistDetail();
        document.getElementById('search-bar').addEventListener('input', filterArtistSongs);
    } else if (document.getElementById('song-title')) {
        loadSongDetail();
    } else if (document.getElementById('favorites-list')) {
        displayFavorites();
    }
});

let allSongs = [];
let allArtists = [];

function loadSongs() {
    fetch('songs.json')
        .then(response => response.json())
        .then(songs => {
            allSongs = songs;
            displaySongs(allSongs); // Display all songs by default
        });
}

function loadArtists() {
    fetch('artists.json')
        .then(response => response.json())
        .then(artists => {
            allArtists = artists;
            displayArtists(allArtists); // Display all artists by default
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
        a.href = 'song.html?title=' + encodeURIComponent(song.title);
        li.appendChild(a);
        songListElement.appendChild(li);
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

function filterContent() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredSongs = allSongs.filter(song => song.title.toLowerCase().includes(query));
    const filteredArtists = allArtists.filter(artist => artist.name.toLowerCase().includes(query));

    displaySongs(filteredSongs);
    displayArtists(filteredArtists);
}

function filterArtists() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredArtists = allArtists.filter(artist => artist.name.toLowerCase().includes(query));

    displayArtists(filteredArtists);
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
    songs.forEach(song => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.id='List';
        a.textContent = song.title;
        a.href = 'song.html?title=' + encodeURIComponent(song.title);
        li.appendChild(a);
        artistSongListElement.appendChild(li);
    });
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

function loadSongDetail() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');

    if (!title) {
        document.getElementById('song-detail').innerHTML = '<p>Song not found</p>';
        return;
    }

    fetch('songs.json')
        .then(response => response.json())
        .then(songs => {
            const song = songs.find(s => s.title === title);
            if (song) {
                document.getElementById('song-title').textContent = song.title;
                document.getElementById('song-artist').textContent = 'Artist: ' + song.artist;
                document.getElementById('song-image').src = song.image;
            } else {
                document.getElementById('song-detail').innerHTML = '<p>Song not found</p>';
            }
        });
}

function goBack() {
    window.history.back();
}

function addFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    console.log(title);
    if (!favorites.includes(title)) {
        favorites.push(title);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Added to favorites');
    } else {
        alert('Already in favorites');
    }
}

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
