import React from 'react';
import './Playlist_module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Playlist({ currentPlaylist, handleRemoval, handlePlaylistNameChange, currentPlaylistName, updatePlaylist, onSave, currentUser }) {

    return (
        <>

            <div id='playlistContainer' className='mt-4'>
                <form action='#' id='createPlaylist' name='createPlaylist' encType="multipart/form-data" onSubmit={(event) => event.preventDefault()}>

                    <InputGroup className='d-sm-none'>
                        <Form.Control type='text' className='border-0' value={currentPlaylistName} onChange={handlePlaylistNameChange} placeholder='Your playlist name' required />
                    </InputGroup>

                    <InputGroup id='desktop' className='d-none d-sm-flex justify-content-center'>
                            <Form.Control type='text' className='border-0' value={currentPlaylistName} onChange={handlePlaylistNameChange} placeholder='Your playlist name' required />
                        </InputGroup>

                    <div id='playlist' className='rounded-2 mt-4'>
                        
                        {
                            currentPlaylist.length <= 0 ? <p className='mt-4 p-3 text-center'>Your current playlist is empty</p> :
                                <>
                                    {

                                        currentPlaylist.map((element) =>


                                            <div className='d-flex align-items-center mt-3 mx-2'>

                                                <img src={element.artwork} className='rounded-1' width='70rem' height='70rem' alt='Album artwork' />

                                                <div id='songTitle' className='flex-grow-1 ps-2'>
                                                    <h1>{element.name}</h1>
                                                    <h2 className='fw-light'>{element.artist}</h2>
                                                </div>

                                                <Button className='bg-transparent border-0' onClick={() => handleRemoval(element.udi)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                                                    </svg>
                                                </Button>

                                            </div>


                                        )

                                    }
                                </>
                        }
                    </div>

                    <div id='btnDiv' className='d-flex justify-content-center pt-4'>

                        <Button type='submit' className='mx-1 dynamicBtn btn-light' onClick={() => onSave(currentUser, currentPlaylistName, currentPlaylist)} disabled={currentPlaylistName.length <= 0 ? true : false}>
                            <span id='addSvg' class="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                                </svg>
                            </span>
                            <span id="addBtn">Add to Spotify</span>
                        </Button>


                        {(currentPlaylist.length > 0 || currentPlaylistName.length > 0) && (
                            <>
                                <Button className='mx-1 dynamicBtn btn-light' onClick={updatePlaylist} disabled={currentPlaylistName.length <= 0 ? true : false}>
                                    <span class="text">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                                        </svg>
                                    </span>
                                    <span id="updateBtn">Update playlist</span>
                                </Button>
                            </>
                        )}
                    </div>

                </form>
            </div>
        </>
    )
}

export default Playlist;