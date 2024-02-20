# JAMMMING
JAMMMING is a web app which connects you to your Spotify account and lets you create and update new playlists thanks to the Spotify API.
Although this project may seem pretty useless to developers (and users, too), it has been developed as a way to practice with ReactJS and API calls.

## How it works
The app's aim is to create new playlists and add or remove tracks to/from them. It consists of different components, each dealing with a different aspect:


- The 'App' component loads the entire app: as soon as the app loads an 'useEffect' hook calls the Spotify API and redirects the user to the Spotify Login Page; once the user is logged in they are redirected to the main page of JAMMMING.

- The 'SearchBar' component display and store what the user types; the user's value is then passed down as prop to the 'SearchResult' component.

- The 'SearchResult' component sends a fetch GET request to the API; the retrieved data is then displayed to the user through the 'Tracklist' component.

-  By clicking on the '+' button the user initialize a new playlist (and sequentially calls the 'Playlist' component); in order to actually save the playlist to the Spotify account the user must name the playlist. There are no restrictions of characters or length since Spotify doesn't specify them. 

- From here the user can add a new playlist to their account, add new songs to it or remove them and update it; there are a few considerations to make:
    - The user can create and modify one playlist at a time (and cannot retrieve the previously saved ones)
    - Once the user modifies the playlist title (e.g. from 'Happy' to 'Happy ') the app will recognize it as new one. This means that update the current playlist's title is not possible.
    
- Since JAMMMING doesn't manage its data with a backend system yet, if you would like to log out from your current Spotify account and use the app with a different one simply click on the 'Your account' link in the navigation bar, logout and come back to JAMMMING: you will be able to log in with a difference account.

---

## Features

- Responsive
- Mobile first
- Cross platform

---

## Tech Stack

HTML, CSS, JavaScript, ReactJS, Bootstrap