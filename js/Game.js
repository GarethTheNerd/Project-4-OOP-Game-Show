/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase("Code is Beautiful"),
        new Phrase("javascript"),
        new Phrase("computing"),
        new Phrase("the cloud"),
        new Phrase("social networking")];
        this.activePhrase = null;
    }

    startGame() {
        const startScreen = document.querySelector('div.start');
        startScreen.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        const phrasesArray = this.phrases;
        const randomIndex = Math.floor(Math.random() * (phrasesArray.length));

        return phrasesArray[randomIndex];
    }

    handleInteraction(e) {
        const buttonClicked = e.target; //This variable contains the single letter that has been clicked
        buttonClicked.disabled = 'true';
        
        if(this.activePhrase.checkLetter(buttonClicked.innerText)) {
            this.activePhrase.showMatchedLetter(buttonClicked.innerText);
            buttonClicked.classList.add('chosen');

            if (this.checkForWin()) {
                this.gameOver();
            }
        } else {
            buttonClicked.classList.add('wrong');
            this.removeLife();
        }
    }

    removeLife() {
        const heartImages = document.querySelectorAll('ol > li.tries > img');
        heartImages[this.missed].src = "images/lostHeart.png";
        this.missed += 1;

        if (this.missed === 5) {
            this.gameOver();
        }

    }

    checkForWin() {
        const lettersLeft = document.querySelectorAll('li.hide').length;

        if (lettersLeft === 0) {
            return true;
        } else {
            return false;
        }
    }

    gameOver() {
        const startScreen = document.querySelector('div.start');
        startScreen.style.display = '';

        const gameOverMessage = document.querySelector('h1#game-over-message');

        if (this.checkForWin()) {
            gameOverMessage.innerText = "Congrats! You win!!";
        } else {
            gameOverMessage.innerText = "Beter luck next time";
        }

        this.resetGame(); //Reset everything for a new game
        
    }

    resetGame() {
        const phraseUl = document.querySelector('div#phrase > ul');
        const phraseListItems = document.querySelectorAll('div#phrase > ul > li');

        for(let i = 0; i < phraseListItems.length; i++) {
            phraseUl.removeChild(phraseListItems[i]);
        }

        const keyButtons = document.querySelectorAll('button.key');

        for(let i = 0; i < keyButtons.length; i++) {
            keyButtons[i].disabled = '';
            keyButtons[i].className = 'key';
        }

        const heartImages = document.querySelectorAll('ol > li.tries > img');

        for(let i = 0; i < heartImages.length; i++) {
            heartImages[i].src = 'images/liveHeart.png';
        }
    }
}