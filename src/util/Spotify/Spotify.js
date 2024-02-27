let accessToken = '';
let clientID = 'aea9ed87cc574d20bed21b68bb83567c';
const redirectUrl = "https://jammmingcr.netlify.app";
let redirect='';

let Spotify = {

  getAccessToken() {
  // this function returns a new token every time the user access the web app
    
  // First check for the access token
    if (accessToken) return accessToken;

    const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
    const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

    // Second check for the access token
    if (tokenInURL && expiryTime) {
      // setting access token and expiry time variables
      accessToken = tokenInURL[1];
      const expiresIn = Number(expiryTime[1]);

      // Setting the access token to expire at the value for expiration time
      window.setTimeout(() => (accessToken = ""), expiresIn * 3600);
      // clearing the url after the access token expires
      window.history.pushState("Access token", null, "/");
      return accessToken;
    }

    // Third check for the access token if the first and second check are both false
    redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
    window.location = redirect;
  },

  getUser() {

    return fetch('https://api.spotify.com/v1/me', {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        return {
          ID: data.id,
          username: data.display_name,
          // profilePicture: data.images[0].url,
          profile: `https://open.spotify.com/user/${data.id}`,
          uri: data.uri
        };
      })
      .catch(error => console.log('error', error));
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {

        if (!jsonResponse) {
          console.error("Response error");
        }

        return jsonResponse.tracks.items.map((t) => ({
          id: t.id,
          name: t.name,
          artist: t.artists[0].name,
          album: t.album.name,
          preview: t.preview_url,
          artwork: t.album.images[0].url,
          uri: t.uri,
        }));
      })
      .catch(error => console.log('error', error));
  },

  createPlaylist(userID, playlistName, /* setIsLoading */) {
    // setIsLoading(true);
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        {
          "name": `${playlistName}`,
          // "description": `${playlistDescription}`,
          "public": true // default
        }
      )
    })
      .then((response) => response.json())
      .then((data) => {
        // setIsLoading(false)
        return {
          ID: data.id,
          uri: data.uri
        }
      })
      .catch(error => console.log('error', error));
  },

  saveSongsToPlaylist(userID, playlistID, playlist) {

    let urisArray = playlist.map((tracks) =>
      tracks.uri
    );

    console.log(urisArray)

    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        {
          "uris": urisArray,
          // "position": 0
        }
      )

    })
      .then((response) => response.json())
      .then((data) => { return data })
      .catch(error => console.log('error', error));
  },

  updatePlaylist(userID, playlistID, playlist) {
    // this method is almost identical to 'saveSongsToPlaylist'; the only difference is that instead of a POST request we're making a PUT request

    let urisArray = playlist.map((tracks) =>
      tracks.uri
    );

    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(
        {

          "uris": urisArray,
          // "position": 0

        }
      )
    }).then((response) => response.json())
      .then((data) => { return data })
      .catch(error => console.log('error', error));
  },

  logout(){
    window.location.href =`https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}&show_dialog=true`;
    ;
  }

}

accessToken = Spotify.getAccessToken();
// once 'Spotify' is imported into the app the access token is retrieved and loaded (accessToke is updated)

export { Spotify };