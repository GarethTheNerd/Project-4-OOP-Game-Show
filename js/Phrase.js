/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase { //Define the Phrase class
    constructor(phrase) { //Constructor with the string parameter
        this.phrase = phrase.toLowerCase(); //convert it to lower case
    }

    addPhraseToDisplay() {
        const phrase = this.phrase; //This is the phrase defined on the object that the method was called on
        const phraseArray = phrase.split(""); //change the string into an array to loop over it

        const phraseUl = document.querySelector('div#phrase > ul'); //Find where the list items for the phrase need to go 

        phraseArray.forEach(letter => { //Loop over the letters in the phrase
            const li = document.createElement('li'); //create the li
            li.innerText = letter; //set it's text to the letter
            if(letter === ' ') { //Check if it is a space as it needs a different class if so
                li.className = 'space';
            } else {
                li.className = `hide letter ${letter}`; //Set it's inital classes
            }
            phraseUl.appendChild(li); //Add all the list items to the UL selected earlier
        });   
    }

    checkLetter(letter) {
        const phrase = this.phrase; //This is the phrase defined on the object that the method was called on
        return phrase.includes(letter); //Returning a boolean based on if it is part of the phrase or not
    }

    showMatchedLetter(letter) {
        const letterElements = document.querySelectorAll(`div#phrase > ul > li.${letter}`); //Select the correct li's for the letter passed as a parameter

        for(let i = 0; i < letterElements.length; i++) { //Loop through them as the letter may appear more than once
            const thisElement = letterElements[i]; 
            thisElement.classList.remove("hide"); //Now we need to swap the hide class for the show class
            thisElement.classList.add("show");

        }
    }
}