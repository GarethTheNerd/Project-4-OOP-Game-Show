/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() { //this constructor has all inital values so doesn't accept any arguments
        this.missed = 0; 
        this.phrases = [new Phrase("Code is Beautiful"),
        new Phrase("javascript"),
        new Phrase("computing"),
        new Phrase("the cloud"),
        new Phrase("social networking")]; //Set phrases to new phrase objects with strings
        this.activePhrase = null;
    }

    startGame() {
        const startScreen = document.querySelector('div.start');
        startScreen.style.display = 'none'; //Select and hide the start screen 
        this.activePhrase = this.getRandomPhrase(); //Set the active phrase
        this.activePhrase.addPhraseToDisplay(); //and add it to the display
    }

    getRandomPhrase() {
        const phrasesArray = this.phrases; //Get the phrases so we can get a random one
        const randomIndex = Math.floor(Math.random() * (phrasesArray.length)); //Get a random number we can use as an index

        return phrasesArray[randomIndex]; //Return the phrase with the randomIndex
    }

    handleInteraction(e) {
        let letter;
        //console.log(e);

        if(e.type === "keyup") { //We need to the letter that was pressed, this is different if it was a keyboard event or a button
            letter = e.key.toLowerCase();
        } else {
            letter = e.target.innerText;
        }

        const keyButtons = document.querySelectorAll('button.key'); //Lets get all the buttons
        let thisButton;

        for(let i = 0; i < keyButtons.length; i++) { //Loop through all the buttons
            if (keyButtons[i].innerText === letter) { //until we find the button with the letter they pressed / clicked
                thisButton = keyButtons[i]; //Now we hold it in thisButton
                break; //Break out the loop as there is no point in continuing
            }
        }

        if(thisButton != undefined) { //This means the button was found, this stops keys other than a-z from interfering

            if (thisButton.disabled == '') { //Checking if the button is already disabled as we don't want them to press the same button multiple times and lose all their lives
            
                thisButton.disabled = 'true'; //Disable the button as they have used this letter

                if(this.activePhrase.checkLetter(letter)) { //If the letter is in the phrase..
                    this.activePhrase.showMatchedLetter(letter); //Show it in the phrase
                    thisButton.classList.add('chosen'); //and on the onscreen keyboard

                    if (this.checkForWin()) { //if they have won
                        this.gameOver(); //show game over
                    }
                } else { //if the letter isn't in the phrase
                    thisButton.classList.add('wrong'); //show it on the keyboard
                    this.removeLife(); //remove a life
                }

            }            
            
        }
    }

    removeLife() {
        const heartImages = document.querySelectorAll('ol > li.tries > img'); //Get all the heart images
        heartImages[this.missed].src = "images/lostHeart.png"; //the missed number will equal the next heart to be lost so use this as the index
        this.missed += 1; //Add one to missed

        if (this.missed === 5) { //They have missed 5 times so end the game
            this.gameOver();
        }

    }

    checkForWin() { //if none of the letters are hidden, they have won!
        const lettersLeft = document.querySelectorAll('li.hide').length;

        if (lettersLeft === 0) {
            return true;
        } else {
            return false;
        }
    }

    gameOver() {
        const startScreen = document.querySelector('div.start');
        startScreen.style.display = ''; //Select and show the start screen

        const gameOverMessage = document.querySelector('h1#game-over-message');

        if (this.checkForWin()) { //Set the title based on if they won or lost!
            gameOverMessage.innerText = "Congrats! You win!!";
        } else {
            gameOverMessage.innerText = "Beter luck next time";
        }

        this.resetGame(); //Reset everything for a new game
        
    }

    resetGame() {
        
        //Remove all the phrase list items
        const phraseUl = document.querySelector('div#phrase > ul');
        const phraseListItems = document.querySelectorAll('div#phrase > ul > li');

        for(let i = 0; i < phraseListItems.length; i++) {
            phraseUl.removeChild(phraseListItems[i]);
        }

        //Renable and reset styles on button keys
        const keyButtons = document.querySelectorAll('button.key');

        for(let i = 0; i < keyButtons.length; i++) {
            keyButtons[i].disabled = '';
            keyButtons[i].className = 'key';
        }

        //Change all the hearts back to live
        const heartImages = document.querySelectorAll('ol > li.tries > img');

        for(let i = 0; i < heartImages.length; i++) {
            heartImages[i].src = 'images/liveHeart.png';
        }
    }
}