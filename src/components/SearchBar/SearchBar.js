import React, { useEffect } from 'react';
import './SearBar_module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

/*

                    <div class="mt-1">

                        <InputGroup className='me-1'>
                            <Form.Control type='text' name='searched' id='searched' value={searchedValue} onChange={handleChange} placeholder="Livin' on a prayer" required />
                        </InputGroup>
                        <Button id='searchBarButton' variant="light" type='submit' onClick={handleSubmit} disabled={searchedValue === '' ? true : false}>Search</Button>


                    </div>

*/

function SearchBar({ searchedValue, handleChange, displayResultsFromSpotify }) {

    function handleSubmit(event) {
        event.preventDefault();
        displayResultsFromSpotify(searchedValue);
    };

    return (
        <>

            <div className='d-flex justify-content-center pt-4'>
                <form action='#action'>

                    <div>

                        <InputGroup className='me-1'>
                            <Form.Control type='text' name='searched' id='searched' value={searchedValue} onChange={handleChange} placeholder="Livin' on a prayer" required />
                        </InputGroup>

                        <Button id='searchBarButton' variant="light" type='submit' onClick={handleSubmit} disabled={searchedValue === '' ? true : false}>                        <img src="img/search.svg" alt="Arrow right" /></Button>


                    </div>

                </form>

            </div>

        </>
    )
}

export default SearchBar;