
const puzzleVisual = document.getElementById("puzzleVisual");
const puzzleQuestion = document.getElementById("puzzleQuestion");
const puzzleAnswers = document.getElementById("puzzleAnswers");
const puzzleFeedback = document.getElementById("puzzleFeedback");

let score = 0;
let stars = 0;
let streak = 0;
let questionNumber = 0;
let bestScore = Number(localStorage.getItem("puzzleBest") || 0);
let currentQuestion = null;
let answered = false;
let soundEnabled = true;
let hasStarted = false;

let level = "easy";
let category = "colors";

const questions = {
    easy: {
        colors: [
            { visual: "🔴 🟡 🔴 🟡 ❓", question: "What comes next?", answers: ["🔴", "🟡", "🔵"], correct: "🔴" },
            { visual: "🔵 🔵 🔴 🔵 🔵 ❓", question: "Which color is missing?", answers: ["🔴", "🟢", "🟡"], correct: "🔴" },
            { visual: "🟢 🟡 🟢 🟡 ❓", question: "Continue the pattern!", answers: ["🟢", "🔴", "🟡"], correct: "🟢" }
        ],
        numbers: [
            { visual: "1️⃣ 2️⃣ 3️⃣ ❓", question: "Which number comes next?", answers: ["4", "5", "2"], correct: "4" },
            { visual: "2️⃣ 4️⃣ 6️⃣ ❓", question: "Complete the number pattern!", answers: ["7", "8", "9"], correct: "8" },
            { visual: "5️⃣ 6️⃣ 7️⃣ ❓", question: "What comes next?", answers: ["8", "9", "4"], correct: "8" }
        ],
        shapes: [
            { visual: "🔺 🔵 🔺 🔵 ❓", question: "Which shape comes next?", answers: ["🔺", "🔵", "🟩"], correct: "🔺" },
            { visual: "⭐ ❤️ ⭐ ❤️ ❓", question: "Continue the pattern!", answers: ["❤️", "⭐", "🌙"], correct: "⭐" },
            { visual: "🟦 🟨 🟦 🟨 ❓", question: "Which shape is next?", answers: ["🟨", "🟦", "🟥"], correct: "🟦" }
        ],
        missing: [
            { visual: "🍎 🍌 ❓ 🍇", question: "Which fruit is missing?", answers: ["🍊", "🍓", "🍉"], correct: "🍊" },
            { visual: "🐶 🐱 ❓ 🐰", question: "Which animal is missing?", answers: ["🐸", "🐻", "🐼"], correct: "🐻" },
            { visual: "🌞 🌙 🌞 ❓", question: "What comes next?", answers: ["🌙", "⭐", "☁️"], correct: "🌙" }
        ]
    },

    medium: {
        colors: [
            { visual: "🔴 🔴 🟡 🔴 🔴 🟡 ❓", question: "Continue the color pattern!", answers: ["🔴", "🟡", "🔵"], correct: "🔴" },
            { visual: "🔵 🟢 🟢 🔵 🟢 🟢 ❓", question: "What comes next?", answers: ["🟢", "🔵", "🟡"], correct: "🔵" },
            { visual: "🟡 🔴 🔵 🟡 🔴 ❓", question: "Which color is missing?", answers: ["🔵", "🔴", "🟢"], correct: "🔵" }
        ],
        numbers: [
            { visual: "2️⃣ 4️⃣ 6️⃣ 8️⃣ ❓", question: "Find the next number!", answers: ["9", "10", "12"], correct: "10" },
            { visual: "5️⃣ 10 1️⃣5️⃣ ❓", question: "What comes next?", answers: ["20", "25", "18"], correct: "20" },
            { visual: "1️⃣ 3️⃣ 5️⃣ 7️⃣ ❓", question: "Complete the pattern!", answers: ["8", "9", "10"], correct: "9" }
        ],
        shapes: [
            { visual: "🔺 🔺 🔵 🔺 🔺 🔵 ❓", question: "Which shape comes next?", answers: ["🔺", "🔵", "🟩"], correct: "🔺" },
            { visual: "⭐ ⭐ ❤️ ⭐ ⭐ ❤️ ❓", question: "Continue the pattern!", answers: ["❤️", "⭐", "🌙"], correct: "⭐" },
            { visual: "🟦 🟥 🟨 🟦 🟥 ❓", question: "Find the missing shape!", answers: ["🟨", "🟦", "🟥"], correct: "🟨" }
        ],
        missing: [
            { visual: "🍎 🍎 🍌 🍎 🍎 ❓", question: "Which fruit completes the pattern?", answers: ["🍌", "🍇", "🍓"], correct: "🍌" },
            { visual: "🐶 🐱 🐶 🐱 ❓", question: "Which animal comes next?", answers: ["🐰", "🐶", "🐱"], correct: "🐶" },
            { visual: "🌞 ⭐ 🌙 🌞 ⭐ ❓", question: "What is missing?", answers: ["🌙", "⭐", "🌞"], correct: "🌙" }
        ]
    },

    hard: {
        colors: [
            { visual: "🔴 🟡 🟢 🔴 🟡 🟢 ❓", question: "Continue this pattern!", answers: ["🔴", "🟡", "🟢"], correct: "🔴" },
            { visual: "🔵 🟢 🟡 🔵 🟢 🟡 ❓", question: "Which color comes next?", answers: ["🟢", "🟡", "🔵"], correct: "🔵" },
            { visual: "🟣 🟣 🔴 🟢 🟣 🟣 🔴 ❓", question: "Find the next color!", answers: ["🟢", "🔴", "🟣"], correct: "🟢" }
        ],
        numbers: [
            { visual: "2️⃣ 4️⃣ 8️⃣ 1️⃣6️⃣ ❓", question: "What number comes next?", answers: ["20", "24", "32"], correct: "32" },
            { visual: "3️⃣ 6️⃣ 9️⃣ 1️⃣2️⃣ ❓", question: "Continue the sequence!", answers: ["15", "14", "18"], correct: "15" },
            { visual: "1️⃣ 4️⃣ 7️⃣ 1️⃣0️⃣ ❓", question: "Find the next number!", answers: ["12", "13", "14"], correct: "13" }
        ],
        shapes: [
            { visual: "🔺 🔵 🟩 🔺 🔵 🟩 ❓", question: "Which shape comes next?", answers: ["🔺", "🔵", "🟩"], correct: "🔺" },
            { visual: "⭐ ❤️ 🌙 ⭐ ❤️ 🌙 ❓", question: "Continue the sequence!", answers: ["❤️", "⭐", "🌙"], correct: "⭐" },
            { visual: "🟦 🟥 🟨 🟩 🟦 🟥 🟨 ❓", question: "Which shape is missing?", answers: ["🟩", "🟨", "🟦"], correct: "🟩" }
        ],
        missing: [
            { visual: "🐶 🐱 🐰 🐶 🐱 ❓", question: "Which animal comes next?", answers: ["🐶", "🐰", "🐱"], correct: "🐰" },
            { visual: "🍎 🍌 🍇 🍎 🍌 ❓", question: "Which fruit completes the sequence?", answers: ["🍇", "🍎", "🍌"], correct: "🍇" },
            { visual: "🌞 🌙 ⭐ 🌞 🌙 ❓", question: "What is the missing symbol?", answers: ["🌞", "⭐", "🌙"], correct: "⭐" }
        ]
    }
};

function playSound(frequency = 500) {
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

function updateScoreboard() {
    document.getElementById("puzzleStars").textContent = stars;
    document.getElementById("puzzleScore").textContent = score;
    document.getElementById("puzzleStreak").textContent = streak;
    document.getElementById("puzzleBest").textContent = bestScore;
}

function loadQuestion() {
    answered = false;

    const categoryQuestions = questions[level][category];
    currentQuestion = categoryQuestions[
        questionNumber % categoryQuestions.length
    ];

    document.getElementById("puzzleQuestionNumber").textContent =
        `Question ${questionNumber + 1}`;

    puzzleQuestion.textContent = currentQuestion.question;
    puzzleVisual.textContent = currentQuestion.visual;
    puzzleAnswers.innerHTML = "";
    puzzleFeedback.textContent = "Think carefully and choose your answer! 🌟";

    const shuffledAnswers = [...currentQuestion.answers].sort(
        () => Math.random() - 0.5
    );

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => checkAnswer(answer, button));

        puzzleAnswers.appendChild(button);
    });

    document.getElementById("nextPuzzle").disabled = true;
    document.getElementById("nextPuzzle").style.opacity = "0.5";
}

function checkAnswer(answer, selectedButton) {
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

        puzzleFeedback.textContent = "🎉 Excellent! You are a puzzle star!";
        puzzleFeedback.style.color = "#35A96D";

        playSound(700);
    } else {
        streak = 0;
        selectedButton.classList.add("wrong");

        puzzleFeedback.textContent =
            `Good try! The correct answer is ${currentQuestion.correct} 💪`;

        puzzleFeedback.style.color = "#E66D8B";

        playSound(200);
    }

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("puzzleBest", bestScore);
    }

    updateScoreboard();

    document.getElementById("nextPuzzle").disabled = false;
    document.getElementById("nextPuzzle").style.opacity = "1";
}

function nextQuestion() {
    if (!gameTimer.isActive() || !answered) return;

    questionNumber++;

    if (questionNumber >= 10) {
        showWinScreen();
    } else {
        loadQuestion();
    }
}

function showWinScreen() {
    gameTimer.stop();
    const puzzleWin = document.getElementById("puzzleWin");
    puzzleWin.hidden = false;
    puzzleWin.classList.remove("hidden");
    document.querySelector(".puzzle-card").classList.add("hidden");
    document.querySelector(".puzzle-levels").classList.add("hidden");
    document.querySelector(".puzzle-categories").classList.add("hidden");

    document.getElementById("puzzleFinalStars").textContent =
        "⭐".repeat(Math.min(stars, 10));

    document.querySelector(".puzzle-win p").textContent =
        `You scored ${score} points and earned ${stars} stars!`;

    playSound(850);
}

function initializePuzzleGame() {
    hasStarted = true;
    score = 0;
    stars = 0;
    streak = 0;
    questionNumber = 0;

    const puzzleWin = document.getElementById("puzzleWin");
    puzzleWin.hidden = true;
    puzzleWin.classList.add("hidden");
    document.querySelector(".puzzle-card").classList.remove("hidden");
    document.querySelector(".puzzle-levels").classList.remove("hidden");
    document.querySelector(".puzzle-categories").classList.remove("hidden");
    document.querySelector(".puzzle-scoreboard").hidden = false;
    document.getElementById("restartPuzzle").hidden = false;

    updateScoreboard();
    loadQuestion();
}

const gameTimer = window.createKhelearnGameTimer({
    onStart: initializePuzzleGame,
    getFinalScore: () => `Score: ${score} points • Stars: ${stars}`
});

function startPuzzleGame() {
    return gameTimer.start();
}

document.querySelectorAll(".level-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".level-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        level = button.dataset.level;

        if (hasStarted) startPuzzleGame();
    });
});

document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        category = button.dataset.category;

        if (hasStarted) startPuzzleGame();
    });
});

document.getElementById("nextPuzzle").addEventListener("click", nextQuestion);

document.getElementById("restartPuzzle").addEventListener("click", startPuzzleGame);

document.getElementById("puzzleSound").addEventListener("click", () => {
    soundEnabled = !soundEnabled;

    document.getElementById("puzzleSound").textContent =
        soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";

    if (soundEnabled) playSound();
});

document.getElementById("playPuzzleAgain").addEventListener("click", startPuzzleGame);

updateScoreboard();
