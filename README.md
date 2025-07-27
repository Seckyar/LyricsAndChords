# Lyrics & Chords Web App

This is a web application for browsing, searching, and managing a collection of Myanmar songs and artists, including lyrics and chords. Users can view song details, search by artist or song title, and manage a list of favorite songs.

## Features

- Browse all songs and artists
- Search for songs and artists by name
- View detailed information about each song and artist
- Add or remove songs from your favorites (stored in browser local storage)
- Responsive navigation and clean UI
- Credits and usage notice for all lyrics and chord images

## Project Structure

```
artist.html
artists.html
artists.json
favorites.html
home.css
index.html
noticeOfUsage.html
song.html
songs.html
songs.json
style.css
javascript/
    artist.js
    artists.js
    favorites.js
    script.js
    song.js
    songs.js
icons/
images/
```

## Getting Started

1. **Clone or download the repository.**
2. **Open `index.html` in your web browser.**
3. **Browse songs, artists, and manage your favorites.**

No server is required; all data is loaded from local JSON files.

## Scripts

- All JavaScript files are located in the [`javascript/`](javascript/) folder.
    - [`script.js`](javascript/script.js): Shared variables and utility functions.
    - [`songs.js`](javascript/songs.js): Song list and search logic.
    - [`artists.js`](javascript/artists.js): Artist list and search logic.
    - [`artist.js`](javascript/artist.js): Artist detail and their songs.
    - [`song.js`](javascript/song.js): Song detail and favorite logic.
    - [`favorites.js`](javascript/favorites.js): Favorites page logic.

## Data

- [`songs.json`](songs.json): List of all songs with metadata.
- [`artists.json`](artists.json): List of all artists with metadata.

## Credits

- All lyrics and chord images are used with permission from [NT Lyric & Chord Facebook Page](https://www.facebook.com/profile.php?id=100063980355353).
- Please see [Notice Of Usage](noticeOfUsage.html) for more information.

## License

This project is for personal and educational use only. Please respect the original
