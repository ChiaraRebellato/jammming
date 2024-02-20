import React, { useState, useEffect } from 'react';
import './App.css';
import User from '../User/User';
import SearchBar from '../SearchBar/SearchBar';
import Tracklist from '../Tracklist/Tracklist';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify/Spotify';

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setUser] = useState([]);
    const [searched, setSearched] = useState('');
    const [songsAvailable, setSongs] = useState([]);
    const [currentPlaylist, setPlaylist] = useState([]);
    const [currentPlaylistName, setPlaylistName] = useState('');
    const [currentPlaylistID, setPlaylistID] = useState('');
    const [savedPlaylist, setSavedPlaylist]=useState(false);

    useEffect(() => {
    // as soon as the component mounts:

        document.getElementById("header").hidden = true;
        // the header is hidden and later made visible again

        document.getElementById("footer").hidden=true;

        setIsLoading(true);
        // setIsLoading is set to true, this way the loading screen is shown

        const intervalId = setTimeout(() => {
            // simulate a loading intro to the web app

            Spotify.getUser().then((results) => setUser(results));
            document.getElementById("header").hidden = false;
            document.getElementById("footer").hidden=false;
            setIsLoading(false);
            // setIsLoading is set to false, this way the loading screen is hidden and replaced by the main content

        }, 5000);

        return () => {
            clearTimeout(intervalId);
        };

    }, []);
    // while testing DO NOT exclude 'useEffect' otherwise the access token won't get updated after its expiration

    document.getElementById("userAccount").setAttribute('href', currentUser.profile);

    function handleChange({ target }) {
    // updates the searched variable at every input's change
        setSearched((prev) => {
            return prev = target.value;
        });
    };

    function displayResultsFromSpotify(searchedSong) {
        Spotify.search(searchedSong).then((results) => setSongs(results));
        document.getElementById("footer").classList.remove("fixed-bottom")
    };

    function handleNewSongs(id, name, artist, artwork, uri) {

        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

        var string_length = 8;
        var randomstring = '';
 
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        // every time a song is added to the playlist a random alphanumeric number is generated and associated to a song
        // this is used to delete just one instance at a time of a song which has been added twice to a playlist 

        let choice = {
            id: id,
            artist: artist,
            name: name,
            artwork: artwork,
            uri: uri,
            udi: randomstring
            // udi is the name of a property used in real life by Spotify when a user adds a song to a playlist
        };

        const isSongInPlaylist = currentPlaylist.some((item) => item.uri === uri);
        // check if a song has been added more than one time; returns true or false

        if (isSongInPlaylist) {
            let clonedSong = window.confirm("Seems like you already added this song to your playlist. Would you like to add it anyway?");
            if (clonedSong) {
                // the confirm window returns true add the duplicated song
                setPlaylist((prev) => {
                    return [...prev, choice]
                    // setPlaylist adds a song that as not been added yet
                });
            }

        } else {
        // if isSongInPlaylist returns false (= no duplicated song) add to the playlist
            setPlaylist((prev) => {
                return [...prev, choice]
                // setPlaylist adds a song that as not been added yet
            });
        };

    };

    useEffect(()=>{
    // as soon as the component mounts 'useEffect' is called every time 'currentPlaylistName' changes and so a potentially new playlist could be created;
    // every time 'currentPlaylistName' changes the 'savedPlaylist' value is set back to false; this is made to prevent the user to 'update' a playlist which has not been created yet
        setSavedPlaylist((prev)=>{return prev=false})
    }, [currentPlaylistName]);

    function handlePlaylistNameChange({ target }) {
        setPlaylistName((prev) => {
            return prev = target.value;
        });

        document.getElementById("addBtn").innerHTML = "Add playlist";
        document.getElementById("addSvg").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" /> </svg>`;

        // every time the playlist name changes (= potential new playlist) the button's text is set to the original state
    };

    function savePlaylist(currentUser, currentPlaylistName, currentPlaylist) {

        setSavedPlaylist(true);

        Spotify.createPlaylist(currentUser.ID, currentPlaylistName)
            .then((response) => {
                setPlaylistID(response.ID);
                Spotify.saveSongsToPlaylist(currentUser.ID, response.ID, currentPlaylist);

            });

        document.getElementById("addBtn").innerHTML = `Playlist created`;
    
        document.getElementById("addSvg").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
      </svg>`;;
        // every time a playlist is created the 'add playlist' button's text is updated

    }

    function handleRemoval(udi) {

        document.body.addEventListener("keypress", function (event) {
            // since 'handleRemoval' is the first button inside the form it will be triggered once the user tries to send the form pressing the enter key
            if (event.key === "Enter") {
                event.preventDefault()
            }
        });

        setPlaylist(
            currentPlaylist.filter((song) =>
                song.udi !== udi
                // since 'udi' is an alphanumeric value is this quite impossible to have a duplicated song with the same 'udi'
                // this prevent the user from removing every instance of a song which has been added multiple times
            )
        )

    };

    function updatePlaylist(userID, playlistID, playlist) {

        if (currentPlaylistName.length <= 0 || !savedPlaylist) {
            alert("You haven't created a new playlist yet!");
            return;
        }

        document.getElementById('updateBtn').innerHTML = "Playlist updated";

        Spotify.updatePlaylist(currentUser.ID, currentPlaylistID, currentPlaylist);

        const intervalId = setTimeout(() => {
            // after 5s the button's text goes back to its original state

            document.getElementById('updateBtn').innerHTML = "Update playlist";

        }, 5000);

        return () => {
            clearTimeout(intervalId);
        };

    }

    return (

        <>

            {isLoading ?
            // if set to 'true' then the loading screen is mounted


                <>

                    <div className='d-flex min-vh-100  px-4 justify-content-center align-items-center'>

                        <div className="boxContainer">
                            <div className="box box1"></div>
                            <div className="box box2"></div>
                            <div className="box box3"></div>
                            <div className="box box4"></div>
                            <div className="box box5"></div>
                        </div>

                        <div id='introTitle' className='text-center'>
                            <h1 className='text-center px-2'>JAMMMING</h1>
                            <span>...Loading...</span>
                        </div>

                        <div className="boxContainer">
                            <div className="box box1"></div>
                            <div className="box box2"></div>
                            <div className="box box3"></div>
                            <div className="box box4"></div>
                            <div className="box box5"></div>
                        </div>

                    </div>
                </>


                :
                // otherwise the main content will appear

                <>

                    <User currentUser={currentUser} />

                    <SearchBar searchedValue={searched} handleChange={handleChange} displayResultsFromSpotify={displayResultsFromSpotify} /> {/* displayResults={displayResults} */}


                    <div id='container' className='mx-3 pb-5'>
                        <>
                            {songsAvailable.length > 0 && (
                                <>
                                    <Tracklist availableSongs={songsAvailable} handleNewSongs={handleNewSongs} />
                                </>
                            )}
                        </>

                        <div>
                            {(currentPlaylist.length > 0 || currentPlaylistName.length > 0) && (
                                <>

                                    <div className='d-flex justify-content-center d-sm-none'>
                                        <hr className='w-75' />
                                    </div>

                                    <Playlist currentPlaylist={currentPlaylist} handleRemoval={handleRemoval} handlePlaylistNameChange={handlePlaylistNameChange} currentPlaylistName={currentPlaylistName} updatePlaylist={updatePlaylist} onSave={savePlaylist} currentUser={currentUser} />
                                </>
                            )}

                        </div>
                    </div>
                </>
            }

        </>
    )

}

export default App;
