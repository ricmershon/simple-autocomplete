import { useState, Fragment } from "react";
import './styles.css'

const Autocomplete = ({ suggestions }) => {

    // Local component state
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');

    /**
     * Fires when user changes input value. Filters suggestions (passed
     * as prop) based on user input, and resets activeSuggestions, updates
     * the filteredSuggestions array, sets showSuggestions to true and revises
     * userInput with input value.
     * 
     * @param {syntheticEvent object} event 
     */
    const onChange = ((event) => {
        const userInput = event.currentTarget.value;

        const filteredSuggestions = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(userInput);
    })

    /**
     * Fires when user clicks on a suggestion. Resets component state and
     * sets userInput to text of selected target.
     * 
     * @param {syntheticEvent object} event 
     */
    const onClick = ((event) => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(event.currentTarget.innerText);
    })

    /**
     * Fires when user presses a keyboard key down.
     * 
     * @param {syntheticEvent object} event
     */
    const onKeyDown = (event) => {

        /**
         * On enter key update userInput and close the suggestionList.
         */
        if (event.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion])
        } 
        /**
         * On up arrow return if there's no activeSuggestion. Decrement
         * activeSuggestion to move visually 'up' the list.
         */
        else if (event.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        } 
        /**
         * On down arrow return nothing if the index matches the length
         * of the filteredSuggestions array. Increment activeSuggestion to
         * move visually 'down' the list.
         */
        else if (event.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };


    let suggestionsListComponent;

    /**
     * Create filteredSuggestions list if showSuggestions true and userInput
     * not null or empty string.
     */
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
                <ul className="suggestions">
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = "suggestion-active";
                        }
                        return (
                            <li
                                className={className}
                                key={suggestion}
                                onClick={onClick}
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            suggestionsListComponent = (
                <div className="no-suggestions">
                    <em>No suggestions available.</em>
                </div>
            );
        }
    }

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
            />
            {suggestionsListComponent}
        </>
    );  
}
  
export default Autocomplete;