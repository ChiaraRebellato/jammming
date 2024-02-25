import React from 'react';
import './Tracklist_module.css'


function Tracklist({ availableSongs, handleNewSongs }) {
    return (
        <>
            <div id='songlist' className='mb-4 rounded-2'>
                {
                    availableSongs.map((element) =>

                        <div id='tracklist' className='d-flex align-items-center my-3 mx-2'>

                            <img src={element.artwork} className='rounded-1' width='70rem' height='70rem' alt='Album artwork' />

                            <div id='songTitle' className='flex-grow-1 ps-2'>
                                <h1>{element.name}</h1>
                                <h2 className='fw-light'>{element.artist}</h2>
                                {element.preview === null ? <span>Preview not available</span> : <audio controls controlsList='nodownload noplaybackrate' src={element.preview} onContextMenu={(event) => { event.preventDefault() }}></audio>}
                                
                            </div>

                            <button id='addButton' className='bg-transparent border-0' onClick={() => handleNewSongs(element.id, element.name, element.artist, element.artwork, element.uri)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                </svg>
                            </button>

                        </div>

                    )
                }
            </div>
        </>
    )
}

export default Tracklist;