let allSongs = [];
let allArtists = [];

function goBack() {
    window.history.back();
}

function removeFromFavorites(artist, title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => !(fav.artist === artist && fav.title === title));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


