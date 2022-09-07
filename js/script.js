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

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//async function to get new words for game
const getWord = async function() {
    const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await data.text();
    console.log(words);

    const wordArray = words.split("\n");
    console.log(wordArray)

    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();

    placeholder(word);
};

//holds place of letters with dot
const placeholder = function(word) {
    const placeholderLetters = [];

    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    };
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

//guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
   
    //inputs guessed letter and clears field for next guess
    const guess = letterInput.value;
    // console.log(guess);
    
    const goodGuess = validateInput(guess);
    // console.log(goodGuess);

    if (goodGuess) {
        makeGuess(guess);
    };
 
    letterInput.value = "";
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
    } else {
        return input;
    };
};

//capture input
const makeGuess = function(letter) {
    letter = letter.toUpperCase();

    if (guessedLetters.includes(letter)) {
        message.innerText = "Already tried that one, try again!";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
        guessRemaining(letter);
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

//count remaining guesses 
const guessRemaining = function(guess) {
    const upWord = word.toUpperCase();

    if (!upWord.includes(guess)) {
        message.innerText = `Word does not include ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    };

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    };
};

//check if player won
const ifWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        // message.style.color = #2C4270;
        startOver();
    };
    startConfetti();
};

// const ifLose = function() {
//     if (word.toUpperCase() !== wordInProgress.innerText) {
//         message.classList.add("win");
//         message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
//         startOver();
//     };
// };

const startOver = function() {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    playersGuessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//play again button
playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    message.innerText = "";
    playersGuessedLetters.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerHTML = `${remainingGuesses} guesses`;

    guessButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    playersGuessedLetters.classList.remove("hide");
    playAgainButton.classList.add("hide");

    getWord();
});