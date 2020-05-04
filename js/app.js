/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startButton = document.querySelector('button#btn__reset');
let myGame;

startButton.addEventListener('click', () => {
    myGame = new Game();
    myGame.startGame();
});

const keyButtons = document.querySelectorAll('button.key');

for(let i = 0; i < keyButtons.length; i++) {
    const thisButton = keyButtons[i];
    thisButton.addEventListener('click', e => myGame.handleInteraction(e));
}