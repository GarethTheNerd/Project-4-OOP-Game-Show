/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startButton = document.querySelector('button#btn__reset');
let myGame;

startButton.addEventListener('click', () => { //When start is clicked, create a new game object and use it to start a game
    myGame = new Game();
    myGame.startGame();
});

const keyButtons = document.querySelectorAll('button.key');

for(let i = 0; i < keyButtons.length; i++) { //Add a click event listener to all the key buttons, I'll loop over them and add it to each button
    const thisButton = keyButtons[i];
    thisButton.addEventListener('click', e => myGame.handleInteraction(e));
} 

//Add keyup listener for exceeds
document.addEventListener("keyup", e => { //if a keyboard key is pressed
    const startScreen = document.querySelector('div.start');
    if (startScreen.style.display === 'none') { //Check if start screen is hidden as we don't want to accept keyboard input on the start screen
        myGame.handleInteraction(e); //pass event over to handleInteraction
    }
});

