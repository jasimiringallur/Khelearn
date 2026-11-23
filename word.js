
const wordVisual = document.getElementById("wordVisual");
const wordQuestion = document.getElementById("wordQuestion");
const wordAnswers = document.getElementById("wordAnswers");
const wordFeedback = document.getElementById("wordFeedback");

let score = 0;
let stars = 0;
let streak = 0;
let questionNumber = 0;
let bestScore = Number(localStorage.getItem("wordBest") || 0);

let level = "easy";
let category = "alphabet";
let currentQuestion;
let answered = false;
let soundEnabled = true;
let hasStarted = false;

const wordQuestions = {
    easy: {
        alphabet: [
            { visual: "🍎", question: "Which letter does Apple start with?", answers: ["A", "B", "C"], correct: "A" },
            { visual: "🐱", question: "Which letter does Cat start with?", answers: ["D", "C", "B"], correct: "C" },
            { visual: "🐶", question: "Which letter does Dog start with?", answers: ["D", "E", "F"], correct: "D" },
            { visual: "🐟", question: "Which letter does Fish start with?", answers: ["F", "G", "H"], correct: "F" },
            { visual: "☀️", question: "Which letter does Sun start with?", answers: ["S", "T", "U"], correct: "S" }
        ],
        picture: [
            { visual: "🍎", question: "Choose the correct word!", answers: ["Apple", "Ball", "Cat"], correct: "Apple" },
            { visual: "🐶", question: "What is this animal?", answers: ["Cat", "Dog", "Fish"], correct: "Dog" },
            { visual: "⚽", question: "What is this?", answers: ["Book", "Ball", "Car"], correct: "Ball" },
            { visual: "🐟", question: "Choose the correct word!", answers: ["Fish", "Bird", "Dog"], correct: "Fish" },
            { visual: "🌞", question: "What do you see?", answers: ["Moon", "Star", "Sun"], correct: "Sun" }
        ],
        spelling: [
            { visual: "🐱", question: "Spell the word CAT!", answers: ["CAT", "BAT", "CAR"], correct: "CAT" },
            { visual: "🐶", question: "Spell the word DOG!", answers: ["DOT", "DOG", "DIG"], correct: "DOG" },
            { visual: "☀️", question: "Spell the word SUN!", answers: ["FUN", "SUN", "RUN"], correct: "SUN" },
            { visual: "🍎", question: "Spell the word APPLE!", answers: ["APPLE", "APPLY", "ANGLE"], correct: "APPLE" },
            { visual: "🐟", question: "Spell the word FISH!", answers: ["DISH", "FISH", "WISH"], correct: "FISH" }
        ]
    },

    medium: {
        alphabet: [
            { visual: "🦁", question: "Which letter starts Lion?", answers: ["L", "M", "N"], correct: "L" },
            { visual: "🐘", question: "Which letter starts Elephant?", answers: ["F", "E", "A"], correct: "E" },
            { visual: "🍌", question: "Which letter starts Banana?", answers: ["B", "D", "P"], correct: "B" },
            { visual: "🌈", question: "Which letter starts Rainbow?", answers: ["R", "S", "T"], correct: "R" },
            { visual: "🐵", question: "Which letter starts Monkey?", answers: ["N", "M", "O"], correct: "M" }
        ],
        picture: [
            { visual: "🦋", question: "Choose the correct word!", answers: ["Bee", "Butterfly", "Bird"], correct: "Butterfly" },
            { visual: "🐢", question: "What animal is this?", answers: ["Turtle", "Rabbit", "Frog"], correct: "Turtle" },
            { visual: "🍉", question: "What fruit is this?", answers: ["Apple", "Melon", "Watermelon"], correct: "Watermelon" },
            { visual: "🚲", question: "What is this?", answers: ["Bicycle", "Bus", "Train"], correct: "Bicycle" },
            { visual: "🌻", question: "Choose the correct word!", answers: ["Rose", "Sunflower", "Tulip"], correct: "Sunflower" }
        ],
        spelling: [
            { visual: "🍌", question: "Spell BANANA!", answers: ["BANANA", "BANDANA", "BANAN"], correct: "BANANA" },
            { visual: "🦁", question: "Spell LION!", answers: ["LINE", "LION", "LOIN"], correct: "LION" },
            { visual: "🐸", question: "Spell FROG!", answers: ["FROM", "FOG", "FROG"], correct: "FROG" },
            { visual: "🌈", question: "Spell RAINBOW!", answers: ["RAINBOW", "RAINBOWS", "RAINBOWY"], correct: "RAINBOW" },
            { visual: "🐰", question: "Spell RABBIT!", answers: ["RABBIT", "RABIT", "RABBET"], correct: "RABBIT" }
        ]
    },

    hard: {
        alphabet: [
            { visual: "🦒", question: "Which letter starts Giraffe?", answers: ["J", "G", "C"], correct: "G" },
            { visual: "🐊", question: "Which letter starts Crocodile?", answers: ["K", "C", "G"], correct: "C" },
            { visual: "🦉", question: "Which letter starts Owl?", answers: ["O", "W", "A"], correct: "O" },
            { visual: "🍍", question: "Which letter starts Pineapple?", answers: ["B", "P", "D"], correct: "P" },
            { visual: "🐬", question: "Which letter starts Dolphin?", answers: ["D", "B", "T"], correct: "D" }
        ],
        picture: [
            { visual: "🦓", question: "Choose the correct word!", answers: ["Horse", "Zebra", "Donkey"], correct: "Zebra" },
            { visual: "🍒", question: "What fruit is this?", answers: ["Cherry", "Grape", "Strawberry"], correct: "Cherry" },
            { visual: "🦩", question: "What bird is this?", answers: ["Flamingo", "Parrot", "Peacock"], correct: "Flamingo" },
            { visual: "🐙", question: "Choose the correct word!", answers: ["Crab", "Octopus", "Jellyfish"], correct: "Octopus" },
            { visual: "🥕", question: "What vegetable is this?", answers: ["Potato", "Carrot", "Tomato"], correct: "Carrot" }
        ],
        spelling: [
            { visual: "🦓", question: "Spell ZEBRA!", answers: ["ZEBRA", "ZEBERA", "ZEBRAH"], correct: "ZEBRA" },
            { visual: "🍒", question: "Spell CHERRY!", answers: ["CHERY", "CHERRY", "CHERREY"], correct: "CHERRY" },
            { visual: "🐙", question: "Spell OCTOPUS!", answers: ["OCTOPUS", "OCTOPIS", "OCTAPUS"], correct: "OCTOPUS" },
            { visual: "🥕", question: "Spell CARROT!", answers: ["CAROT", "CARROT", "CARRET"], correct: "CARROT" },
            { visual: "🦒", question: "Spell GIRAFFE!", answers: ["GIRAFFE", "GIRAFF", "JIRAFFE"], correct: "GIRAFFE" }
        ]
    }
};

function playWordSound(frequency = 500) {
    if (!soundEnabled) return;

    try {
        const audio = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.frequency.value = frequency;
        gain.gain.value = 0.08;

        oscillator.start();
        oscillator.stop(audio.currentTime + 0.15);
        oscillator.onended = () => audio.close();
    } catch (error) {
        console.log("Sound is unavailable.");
    }
}

function updateWordScore() {
    document.getElementById("wordStars").textContent = stars;
    document.getElementById("wordScore").textContent = score;
    document.getElementById("wordStreak").textContent = streak;
    document.getElementById("wordBest").textContent = bestScore;
}

function loadWordQuestion() {
    answered = false;

    const list = wordQuestions[level][category];

    currentQuestion = list[questionNumber % list.length];

    document.getElementById("wordQuestionNumber").textContent =
        `Question ${questionNumber + 1}`;

    wordQuestion.textContent = currentQuestion.question;
    wordVisual.textContent = currentQuestion.visual;
    wordAnswers.innerHTML = "";

    wordFeedback.textContent = "Choose your answer! 🌈";
    wordFeedback.style.color = "#8067D8";

    const shuffledAnswers = [...currentQuestion.answers].sort(
        () => Math.random() - 0.5
    );

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkWordAnswer(answer, button);
        });

        wordAnswers.appendChild(button);
    });

    document.getElementById("nextWord").disabled = true;
    document.getElementById("nextWord").style.opacity = "0.5";
}

function checkWordAnswer(answer, selectedButton) {
    if (!gameTimer.isActive() || answered) return;

    answered = true;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === currentQuestion.correct) {
            button.classList.add("correct");
        }
    });

    if (answer === currentQuestion.correct) {
        score += 10;
        stars++;
        streak++;

        wordFeedback.textContent = "🎉 Wonderful! You are a word star!";
        wordFeedback.style.color = "#35A96D";

        playWordSound(700);
    } else {
        streak = 0;
        selectedButton.classList.add("wrong");

        wordFeedback.textContent =
            `Good try! The correct answer is ${currentQuestion.correct} 💪`;

        wordFeedback.style.color = "#E66D8B";

        playWordSound(200);
    }

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("wordBest", bestScore);
    }

    updateWordScore();

    document.getElementById("nextWord").disabled = false;
    document.getElementById("nextWord").style.opacity = "1";
}

function nextWordQuestion() {
    if (!gameTimer.isActive() || !answered) return;

    questionNumber++;

    if (questionNumber >= 10) {
        showWordWin();
    } else {
        loadWordQuestion();
    }
}

function showWordWin() {
    gameTimer.stop();
    document.getElementById("wordWin").classList.remove("hidden");
    document.querySelector(".word-card").classList.add("hidden");
    document.querySelector(".word-levels").classList.add("hidden");
    document.querySelector(".word-categories").classList.add("hidden");

    document.getElementById("wordFinalStars").textContent =
        "⭐".repeat(Math.min(stars, 10));

    document.querySelector(".word-win p").textContent =
        `You scored ${score} points and earned ${stars} stars!`;

    playWordSound(850);
}

function initializeWordGame() {
    hasStarted = true;
    score = 0;
    stars = 0;
    streak = 0;
    questionNumber = 0;

    document.getElementById("wordWin").classList.add("hidden");
    document.querySelector(".word-card").classList.remove("hidden");
    document.querySelector(".word-levels").classList.remove("hidden");
    document.querySelector(".word-categories").classList.remove("hidden");
    document.querySelector(".word-scoreboard").hidden = false;
    document.getElementById("restartWord").hidden = false;

    updateWordScore();
    loadWordQuestion();
}

const gameTimer = window.createKhelearnGameTimer({
    onStart: initializeWordGame,
    getFinalScore: () => `Score: ${score} points • Stars: ${stars}`
});

function startWordGame() {
    return gameTimer.start();
}

document.querySelectorAll(".level-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".level-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        level = button.dataset.level;

        if (hasStarted) startWordGame();
    });
});

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        category = button.dataset.category;

        if (hasStarted) startWordGame();
    });
});

document.getElementById("nextWord").addEventListener("click", nextWordQuestion);

document.getElementById("restartWord").addEventListener("click", startWordGame);

document.getElementById("wordSound").addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    document.getElementById("wordSound").textContent =
        soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";

    if (soundEnabled) playWordSound();
});

document.getElementById("playWordAgain").addEventListener("click", startWordGame);

updateWordScore();
