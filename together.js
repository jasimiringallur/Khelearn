// =======================================
// BRAINBOOST TOGETHER
// Two-player same-device game
// =======================================

const setupScreen = document.getElementById("setupScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const playerOneInput = document.getElementById("playerOne");
const playerTwoInput = document.getElementById("playerTwo");

const startButton = document.getElementById("startGame");
const setupMessage = document.getElementById("setupMessage");

const gameCards = document.querySelectorAll(".game-card");

const gameTitle = document.getElementById("currentGameTitle");
const questionText = document.getElementById("questionText");
const answerArea = document.getElementById("answerArea");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");

const scoreOneElement = document.getElementById("scoreOne");
const scoreTwoElement = document.getElementById("scoreTwo");

const nameOneElement = document.getElementById("nameOne");
const nameTwoElement = document.getElementById("nameTwo");

const scoreCardOne = document.getElementById("scoreCardOne");
const scoreCardTwo = document.getElementById("scoreCardTwo");

const turnIndicator = document.getElementById("turnIndicator");
const roundLabel = document.getElementById("roundLabel");
const progressBar = document.getElementById("progressBar");

const changeGameButton = document.getElementById("changeGame");
const playAgainButton = document.getElementById("playAgain");
const newGameButton = document.getElementById("newGame");

let selectedGame = "memory";

let players = ["Player One", "Player Two"];
let scores = [0, 0];

let currentPlayer = 0;
let currentRound = 0;
let questions = [];
let answered = false;

const TOTAL_ROUNDS = 5;

// =======================================
// GAME QUESTIONS
// =======================================

const questionBank = {

    memory: [
        {
            question: "Which animal is known as the King of the Jungle?",
            options: ["Lion", "Elephant", "Tiger", "Monkey"],
            answer: "Lion"
        },
        {
            question: "How many legs does a spider have?",
            options: ["Four", "Six", "Eight", "Ten"],
            answer: "Eight"
        },
        {
            question: "Which colour do you get by mixing red and yellow?",
            options: ["Green", "Orange", "Purple", "Blue"],
            answer: "Orange"
        },
        {
            question: "Which animal gives us milk?",
            options: ["Cow", "Lion", "Fox", "Wolf"],
            answer: "Cow"
        },
        {
            question: "How many days are there in a week?",
            options: ["Five", "Six", "Seven", "Eight"],
            answer: "Seven"
        },
        {
            question: "Which planet do we live on?",
            options: ["Mars", "Earth", "Venus", "Jupiter"],
            answer: "Earth"
        },
        {
            question: "Which bird can imitate human speech?",
            options: ["Eagle", "Parrot", "Crow", "Owl"],
            answer: "Parrot"
        },
        {
            question: "How many months are there in a year?",
            options: ["10", "11", "12", "13"],
            answer: "12"
        },
        {
            question: "Which animal has a long trunk?",
            options: ["Giraffe", "Elephant", "Zebra", "Camel"],
            answer: "Elephant"
        },
        {
            question: "What do bees make?",
            options: ["Milk", "Honey", "Butter", "Juice"],
            answer: "Honey"
        }
    ],

    math: [
        {
            question: "What is 12 + 8?",
            options: ["18", "20", "22", "24"],
            answer: "20"
        },
        {
            question: "What is 9 × 5?",
            options: ["35", "40", "45", "50"],
            answer: "45"
        },
        {
            question: "What is 100 - 35?",
            options: ["55", "65", "75", "85"],
            answer: "65"
        },
        {
            question: "What is 48 ÷ 6?",
            options: ["6", "7", "8", "9"],
            answer: "8"
        },
        {
            question: "What is 15 + 17?",
            options: ["30", "31", "32", "33"],
            answer: "32"
        },
        {
            question: "What is 7 × 6?",
            options: ["36", "42", "48", "54"],
            answer: "42"
        },
        {
            question: "What is 81 ÷ 9?",
            options: ["7", "8", "9", "10"],
            answer: "9"
        },
        {
            question: "What is 25 + 19?",
            options: ["42", "43", "44", "45"],
            answer: "44"
        },
        {
            question: "What is 90 - 37?",
            options: ["53", "55", "57", "59"],
            answer: "53"
        },
        {
            question: "What is 12 × 4?",
            options: ["36", "42", "48", "52"],
            answer: "48"
        }
    ],

    puzzle: [
        {
            question: "What has hands but cannot clap?",
            options: ["A clock", "A robot", "A doll", "A tree"],
            answer: "A clock"
        },
        {
            question: "What comes next: 2, 4, 6, 8, ...?",
            options: ["9", "10", "11", "12"],
            answer: "10"
        },
        {
            question: "Which one does not belong?",
            options: ["Apple", "Banana", "Carrot", "Mango"],
            answer: "Carrot"
        },
        {
            question: "What has a neck but no head?",
            options: ["Bottle", "Chair", "Book", "Table"],
            answer: "Bottle"
        },
        {
            question: "If today is Monday, what day is tomorrow?",
            options: ["Sunday", "Tuesday", "Friday", "Saturday"],
            answer: "Tuesday"
        },
        {
            question: "What has keys but cannot open doors?",
            options: ["Piano", "Car", "House", "Box"],
            answer: "Piano"
        },
        {
            question: "What comes next: 5, 10, 15, 20, ...?",
            options: ["22", "25", "30", "35"],
            answer: "25"
        },
        {
            question: "Which shape has no corners?",
            options: ["Square", "Triangle", "Circle", "Rectangle"],
            answer: "Circle"
        },
        {
            question: "What gets wetter as it dries?",
            options: ["Towel", "Sun", "Paper", "Stone"],
            answer: "Towel"
        },
        {
            question: "How many sides does a hexagon have?",
            options: ["Five", "Six", "Seven", "Eight"],
            answer: "Six"
        }
    ],

    word: [
        {
            question: "Which is the opposite of HOT?",
            options: ["Warm", "Cold", "Big", "Fast"],
            answer: "Cold"
        },
        {
            question: "Which word is spelled correctly?",
            options: ["Frend", "Friend", "Freind", "Freand"],
            answer: "Friend"
        },
        {
            question: "What is the plural of CHILD?",
            options: ["Childs", "Childes", "Children", "Childrens"],
            answer: "Children"
        },
        {
            question: "Which word is a fruit?",
            options: ["Chair", "Apple", "Pencil", "Window"],
            answer: "Apple"
        },
        {
            question: "What is the opposite of HAPPY?",
            options: ["Joyful", "Excited", "Sad", "Funny"],
            answer: "Sad"
        },
        {
            question: "What is the opposite of TALL?",
            options: ["Short", "High", "Big", "Long"],
            answer: "Short"
        },
        {
            question: "Which word is an animal?",
            options: ["Table", "Tiger", "Pencil", "Bottle"],
            answer: "Tiger"
        },
        {
            question: "What is the plural of BOOK?",
            options: ["Bookes", "Books", "Bookies", "Book's"],
            answer: "Books"
        },
        {
            question: "Which word rhymes with SUN?",
            options: ["Moon", "Fun", "Star", "Sky"],
            answer: "Fun"
        },
        {
            question: "Which is a naming word?",
            options: ["Run", "Beautiful", "School", "Quickly"],
            answer: "School"
        }
    ],

    focus: [
        {
            question: "Which number is different?",
            options: ["5", "5", "8", "5"],
            answer: "8"
        },
        {
            question: "Which colour is different?",
            options: ["Red", "Red", "Blue", "Red"],
            answer: "Blue"
        },
        {
            question: "Which one is not an animal?",
            options: ["Dog", "Cat", "Table", "Horse"],
            answer: "Table"
        },
        {
            question: "Which shape has three sides?",
            options: ["Circle", "Square", "Triangle", "Rectangle"],
            answer: "Triangle"
        },
        {
            question: "Find the different letter.",
            options: ["A", "A", "B", "A"],
            answer: "B"
        },
        {
            question: "Which number is different?",
            options: ["12", "12", "15", "12"],
            answer: "15"
        },
        {
            question: "Which item is not used for writing?",
            options: ["Pen", "Pencil", "Eraser", "Spoon"],
            answer: "Spoon"
        },
        {
            question: "Which letter is different?",
            options: ["M", "M", "N", "M"],
            answer: "N"
        },
        {
            question: "Which animal is different?",
            options: ["Dog", "Cat", "Lion", "Car"],
            answer: "Car"
        },
        {
            question: "Which number is the largest?",
            options: ["25", "52", "15", "35"],
            answer: "52"
        }
    ]

};



const gameNames = {
    memory: "🃏 Memory Magic",
    math: "🔢 Math Adventure",
    puzzle: "🧩 Brain Puzzle",
    word: "🔤 Word Wonder",
    focus: "🎯 Focus Finder"
};

// =======================================
// SELECT GAME
// =======================================

function selectGame(game) {

    if (!questionBank[game]) return;

    selectedGame = game;

    gameCards.forEach(card => {
        card.classList.toggle(
            "selected",
            card.dataset.game === game
        );
    });
}

gameCards.forEach(card => {

    card.addEventListener("click", () => {
        selectGame(card.dataset.game);
    });

});

// Read the game selected from the homepage popup.
try {
    const homepageGame = sessionStorage.getItem("selectedTogetherGame");

    if (homepageGame) {

        const value = homepageGame.toLowerCase();

        if (value.includes("memory")) selectedGame = "memory";
        else if (value.includes("math")) selectedGame = "math";
        else if (value.includes("puzzle") || value.includes("logic")) selectedGame = "puzzle";
        else if (value.includes("word")) selectedGame = "word";
        else if (value.includes("focus")) selectedGame = "focus";

        selectGame(selectedGame);

    }
} catch (error) {
    console.log("Session storage is unavailable.");
}

// =======================================
// START GAME
// =======================================

startButton.addEventListener("click", startGame);

function startGame() {

    const name1 = playerOneInput.value.trim();
    const name2 = playerTwoInput.value.trim();

    if (!name1 || !name2) {
        setupMessage.textContent = "Please enter both player names!";
        return;
    }

    if (name1.toLowerCase() === name2.toLowerCase()) {
        setupMessage.textContent = "Please enter two different names!";
        return;
    }

    players = [name1, name2];
    scores = [0, 0];
    currentPlayer = 0;
    currentRound = 0;

    // We need 10 questions: 5 for each player.
    questions = [...questionBank[selectedGame]];

    if (questions.length < 10) {
        setupMessage.textContent =
            "This game needs at least 10 questions. Please add more questions.";
        return;
    }

    questions.sort(() => Math.random() - 0.5);

    nameOneElement.textContent = players[0];
    nameTwoElement.textContent = players[1];

    gameTitle.textContent = gameNames[selectedGame];

    setupScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    showQuestion();
}

// =======================================
// DISPLAY QUESTION
// =======================================

function showQuestion() {

    answered = false;

    // Different question for each player.
    const questionIndex = currentRound * 2 + currentPlayer;
    const question = questions[questionIndex];

    questionText.textContent = question.question;

    document.getElementById("questionNumber").textContent =
        "QUESTION " + (currentRound + 1);

    roundLabel.textContent =
        "Round " + (currentRound + 1) + " / " + TOTAL_ROUNDS;

    progressBar.style.width =
        (currentRound / TOTAL_ROUNDS * 100) + "%";

    scoreOneElement.textContent = scores[0];
    scoreTwoElement.textContent = scores[1];

    if (currentPlayer === 0) {
        turnIndicator.textContent = "🟢 " + players[0] + "'s Turn";
        scoreCardOne.classList.add("active-score");
        scoreCardTwo.classList.remove("active-score");
    } else {
        turnIndicator.textContent = "🟢 " + players[1] + "'s Turn";
        scoreCardTwo.classList.add("active-score");
        scoreCardOne.classList.remove("active-score");
    }

    answerArea.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    nextButton.classList.add("hidden");

    question.options.forEach(option => {

        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(button, option, question.answer);
        });

        answerArea.appendChild(button);
    });
}



// =======================================
// CHECK ANSWER
// =======================================

function checkAnswer(button, selectedAnswer, correctAnswer) {

    if (answered) return;

    answered = true;

    const allButtons = answerArea.querySelectorAll(".answer-button");

    allButtons.forEach(answerButton => {
        answerButton.disabled = true;

        if (answerButton.textContent === correctAnswer) {
            answerButton.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {

        scores[currentPlayer] += 10;

        feedback.textContent =
            "🎉 Correct answer! +10 points for " + players[currentPlayer];

        feedback.classList.add("correct-text");

    } else {

        button.classList.add("wrong");

        feedback.textContent =
            "❌ Not quite! The correct answer is " + correctAnswer;

        feedback.classList.add("wrong-text");

    }

    scoreOneElement.textContent = scores[0];
    scoreTwoElement.textContent = scores[1];

    nextButton.textContent =
        currentPlayer === 0 ? "Next Player →" : "Next Round →";

    nextButton.classList.remove("hidden");

}


// =======================================
// NEXT PLAYER / NEXT ROUND
// =======================================

nextButton.onclick = function () {

    if (!answered) {
        return;
    }

    // Hide the button immediately to prevent double clicks.
    nextButton.classList.add("hidden");

    if (currentPlayer === 0) {

        // Player 1 has finished. Now Player 2 plays.
        currentPlayer = 1;

    } else {

        // Both players have finished this round.
        currentPlayer = 0;
        currentRound++;

    }

    if (currentRound >= TOTAL_ROUNDS) {

        showResults();

    } else {

        showQuestion();

    }

};


// =======================================
// RESULTS
// =======================================

function showResults() {

    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    document.getElementById("finalNameOne").textContent = players[0];
    document.getElementById("finalNameTwo").textContent = players[1];

    document.getElementById("finalScoreOne").textContent = scores[0];
    document.getElementById("finalScoreTwo").textContent = scores[1];

    const resultTitle = document.getElementById("resultTitle");
    const resultMessage = document.getElementById("resultMessage");

    if (scores[0] > scores[1]) {

        resultTitle.textContent = "🏆 " + players[0] + " Wins!";
        resultMessage.textContent =
            "Congratulations! " + players[0] + " is the Khelearn champion!";

    } else if (scores[1] > scores[0]) {

        resultTitle.textContent = "🏆 " + players[1] + " Wins!";
        resultMessage.textContent =
            "Congratulations! " + players[1] + " is the Khelearn champion!";

    } else {

        resultTitle.textContent = "🤝 It's a Tie!";
        resultMessage.textContent =
            "Amazing! Both players are Khelearn champions!";

    }

}

// =======================================
// PLAY AGAIN
// =======================================

playAgainButton.addEventListener("click", () => {

    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    scores = [0, 0];
    currentPlayer = 0;
    currentRound = 0;

 // Create separate randomized questions for both players.
let shuffledQuestions = [...questionBank[selectedGame]];

shuffledQuestions.sort(() => Math.random() - 0.5);

questions = shuffledQuestions;

});

// =======================================
// CHANGE GAME
// =======================================

changeGameButton.addEventListener("click", returnToSetup);

newGameButton.addEventListener("click", returnToSetup);

function returnToSetup() {

    gameScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");

    setupMessage.textContent = "";

}