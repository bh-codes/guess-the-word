// The unordered list where the player’s guessed letters will appear.
const playersGuessedLetters = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//holds place of letters with dot
const placeholder = function(word) {
    const placeholderLetters = [];

    for (const letter of word) {
        placeholderLetters.push("●");
    };
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
   
    //inputs guessed letter and clears field for next guess
    const guess = letterInput.value;
    // console.log(guess);
    letterInput.value = "";


    const goodGuess = validateInput(guess);
    console.log(goodGuess);
    
    makeGuess(guess);
});

//validate the player's input
const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        message.innerText = "Empty! Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Too many! Only one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Not valid. Only A to Z.";
    } return input;
};

//capture input
const makeGuess = function(letter) {
    letter = letter.toUpperCase();

    if (guessedLetters.includes(letter)) {
        message.innerText = "Already tried that one, try again!";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    };
};

//show guessed letters on page
const showGuessedLetters = function() {
    playersGuessedLetters.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        playersGuessedLetters.append(li);
    };
};

//update word in progress
const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);

    const updatedLetters = [];

    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            updatedLetters.push(letter);
        } else {
            updatedLetters.push("●");
        };
        wordInProgress.innerText = updatedLetters.join("");
    };
    ifWin();
};

//check if player won
const ifWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    };
}