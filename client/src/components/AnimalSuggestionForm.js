import React from 'react'
import { useState } from 'react';
import animalService from '../services/animals'

const AnimalSuggestionForm = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState(null);

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
        searchWikipedia(event.target.value);
    };

    const searchWikipedia = async (query) => {
        // Make an API request to Wikipedia API to search for articles related to the query
        // Set the searchResults state to the array of results returned from the API
        try {
            let searchQuery = encodeURIComponent(query.trim());
            if (!searchQuery) {
                setSearchResults([]);
                return;
            }
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${query}&srprop=snippet|pageimage&origin=*`);
            const data = await response.json();
            const wikiResults = {};
            for (const key in data.query.search) {
                const title = encodeURIComponent(data.query.search[key].title.trim())
                const imgResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${title}&formatversion=2&piprop=thumbnail&pithumbsize=200&origin=*`);
                const imgData = await imgResponse.json();
                const imgURL = imgData.query.pages[0].thumbnail
                wikiResults[data.query.search[key].title] = imgURL;
                console.log(imgURL);
            }
            /* const wikiResults = {};
            data.query.search.map(result => (
                wikiResults[result.title] = fetch(
                    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(result.title.trim())}&formatversion=2&piprop=thumbnail&pithumbsize=200&pilimit=10`
                )
            ))
            console.log(wikiResults); */
            setSearchResults(data.query.search);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleSelectedResultChange = (result) => {
        setSelectedResult(result);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearchQuery('')
        setSearchResults([])
        console.log(selectedResult.title);
        animalService
            .postAnimalSuggestion(selectedResult.title)
        setSelectedResult('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="form__group field">
                <input
                    class="form__field"
                    placeholder="Name"
                    name="name"
                    id='name'
                    required
                    type='input'
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                <label for="name" class="form__label">Search Wikipedia</label>
            </div>
            <ul>
                {searchResults.map((result) => (
                    <li key={result.pageid} onClick={() => handleSelectedResultChange(result)}>
                        {result.title}
                    </li>
                ))}
            </ul>
            {selectedResult && <p>You have selected: {selectedResult.title}</p>}
            <button className='button' type="submit" disabled={!selectedResult}>
                Submit Suggestion
            </button>
        </form>
    )
}

export default AnimalSuggestionForm

