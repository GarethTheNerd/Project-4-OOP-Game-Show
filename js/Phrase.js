/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        const phrase = this.phrase; //This is the phrase defined on the object that the method was called on
        const phraseArray = phrase.split("");

        const phraseUl = document.querySelector('div#phrase > ul');

        phraseArray.forEach(letter => {
            const li = document.createElement('li');
            li.innerText = letter;
            if(letter === ' ') {
                li.className = 'space';
            } else {
                li.className = `hide letter ${letter}`;
            }
            phraseUl.appendChild(li);
        });   
    }

    checkLetter(letter) {
        const phrase = this.phrase; //This is the phrase defined on the object that the method was called on
        return phrase.includes(letter); //Returning a boolean based on if it is part of the phrase or not
    }

    showMatchedLetter(letter) {
        const letterElements = document.querySelectorAll(`div#phrase > ul > li.${letter}`);

        for(let i = 0; i < letterElements.length; i++) {
            const thisElement = letterElements[i];
            thisElement.classList.remove("hide");
            thisElement.classList.add("show");

        }
    }
}