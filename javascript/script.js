let allSongs = [];
let allArtists = [];

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

function removeFromFavorites(artist, title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => !(fav.artist === artist && fav.title === title));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


