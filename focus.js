
const questions = {
    easy: [
        { target: "⭐", objects: ["🌸", "⭐", "🍎", "🐱", "🌈", "⚽", "🐶", "🍓"] },
        { target: "🐸", objects: ["🐱", "🐶", "🐸", "🦋", "🍌", "🌻", "🚗", "🐼"] },
        { target: "🍎", objects: ["🍇", "🍌", "🍎", "🍓", "🥕", "🍊", "🍉", "🍍"] },
        { target: "🚗", objects: ["🚲", "✈️", "🚗", "🚂", "🚀", "🚌", "🚕", "🚁"] },
        { target: "🐼", objects: ["🐻", "🐨", "🐼", "🐯", "🦁", "🐸", "🐰", "🐵"] },
        { target: "🌙", objects: ["☀️", "⭐", "🌙", "🌈", "☁️", "⚡", "❄️", "🔥"] },
        { target: "⚽", objects: ["🏀", "🎾", "⚽", "🏈", "🎱", "🏐", "🥎", "🏓"] },
        { target: "🦋", objects: ["🐝", "🐞", "🦋", "🐜", "🪲", "🦗", "🐛", "🕷️"] },
        { target: "🍦", objects: ["🍰", "🍩", "🍦", "🍪", "🍭", "🍫", "🧁", "🍬"] },
        { target: "🐢", objects: ["🐍", "🐊", "🐢", "🦎", "🐸", "🐠", "🦀", "🐙"] }
    ],
    medium: [
        { target: "🦄", objects: ["🐴", "🦓", "🦄", "🐮", "🐷", "🐑", "🐐", "🦌", "🐪", "🦒", "🐘", "🦏"] },
        { target: "🍉", objects: ["🍈", "🍍", "🍉", "🍋", "🍌", "🥭", "🍊", "🍇", "🍓", "🥝", "🍎", "🍐"] },
        { target: "🎸", objects: ["🎹", "🥁", "🎺", "🎸", "🎻", "🪇", "🎷", "🪈", "🎤", "🎧", "📯", "🎼"] },
        { target: "🦉", objects: ["🦅", "🦆", "🦉", "🐦", "🦜", "🦢", "🕊️", "🐧", "🐓", "🦩", "🦚", "🐤"] },
        { target: "🚁", objects: ["🚀", "✈️", "🛩️", "🚁", "🚂", "🚢", "🚲", "🚜", "🚕", "🚌", "🚐", "🚚"] },
        { target: "🥑", objects: ["🥝", "🥒", "🥑", "🥦", "🥬", "🍏", "🍐", "🫛", "🫒", "🥕", "🌽", "🍆"] },
        { target: "🦀", objects: ["🐙", "🦞", "🦀", "🦐", "🐠", "🐡", "🐬", "🐳", "🦈", "🪼", "🦭", "🐚"] },
        { target: "🎈", objects: ["🎁", "🎀", "🎈", "🎉", "🎊", "🎂", "🪅", "🧸", "🪁", "🎯", "🎮", "🎲"] },
        { target: "🌵", objects: ["🌴", "🌳", "🌵", "🌲", "🌷", "🌻", "🌼", "🍀", "🌾", "🪴", "🌿", "🍁"] },
        { target: "🦒", objects: ["🐘", "🦓", "🦒", "🦏", "🦛", "🐪", "🐫", "🦘", "🐅", "🦁", "🐆", "🐒"] }
    ],
    hard: [
        { target: "🦩", objects: ["🦢", "🦩", "🦚", "🦜", "🦆", "🐧", "🦉", "🦅", "🐓", "🕊️", "🐦", "🐤", "🦃", "🐥", "🪿", "🦤"] },
        { target: "🥨", objects: ["🥐", "🥯", "🥖", "🥨", "🍞", "🧇", "🥞", "🧀", "🍪", "🍩", "🥮", "🍰", "🧁", "🍫", "🍬", "🍭"] },
        { target: "🛴", objects: ["🚲", "🛵", "🛴", "🏍️", "🚗", "🚕", "🚙", "🚌", "🚎", "🚐", "🚚", "🚜", "🚑", "🚒", "🚓", "🚛"] },
        { target: "🪼", objects: ["🐙", "🦑", "🪼", "🦀", "🦞", "🦐", "🐠", "🐡", "🐬", "🐳", "🦈", "🐚", "🦭", "🪸", "🦦", "🐟"] },
        { target: "🪇", objects: ["🥁", "🎸", "🎹", "🎷", "🪇", "🎺", "🎻", "🪈", "🎤", "🎧", "🎼", "📯", "🪕", "🎵", "🎶", "🔔"] },
        { target: "🫛", objects: ["🥒", "🥦", "🫛", "🥬", "🥑", "🫒", "🌽", "🥕", "🍆", "🍅", "🧄", "🧅", "🫑", "🥔", "🍠", "🌶️"] },
        { target: "🦔", objects: ["🐿️", "🦔", "🦇", "🐻", "🦝", "🦨", "🦡", "🐰", "🦊", "🐺", "🐱", "🐭", "🐹", "🐸", "🐼", "🐨"] },
        { target: "🪁", objects: ["🎈", "🪁", "🎀", "🎁", "🎊", "🎉", "🪅", "🎯", "🎲", "🎮", "🧩", "🪀", "🪄", "🎭", "🎨", "🧸"] },
        { target: "🦚", objects: ["🦜", "🦩", "🦚", "🦢", "🦆", "🦉", "🦅", "🐧", "🦃", "🪿", "🐦", "🐤", "🐓", "🕊️", "🦤", "🐥"] },
        { target: "🪸", objects: ["🐚", "🪸", "🪼", "🦀", "🦞", "🦐", "🐙", "🦑", "🐠", "🐡", "🐟", "🦈", "🐬", "🐳", "🦭", "🦦"] }
    ]
};

let level = "easy";
let questionIndex = 0;
let score = 0;
let stars = 0;
let streak = 0;
let soundOn = true;
let answered = false;
let gameQuestions = [];

const focusStars = document.getElementById("focusStars");
const focusScore = document.getElementById("focusScore");
const focusStreak = document.getElementById("focusStreak");
const focusBest = document.getElementById("focusBest");
const focusQuestion = document.getElementById("focusQuestion");
const focusQuestionNumber = document.getElementById("focusQuestionNumber");
const focusVisual = document.getElementById("focusVisual");
const focusFeedback = document.getElementById("focusFeedback");
const nextFocus = document.getElementById("nextFocus");
const focusWin = document.getElementById("focusWin");
const focusFinalStars = document.getElementById("focusFinalStars");

let best = Number(localStorage.getItem("focusBest")) || 0;
focusBest.textContent = best;

function playTone(frequency, duration = 180) {
    if (!soundOn) return;

    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.08;

    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration / 1000);
    oscillator.stop(audio.currentTime + duration / 1000);
    oscillator.onended = () => audio.close();
}

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function updateScoreboard() {
    focusStars.textContent = stars;
    focusScore.textContent = score;
    focusStreak.textContent = streak;

    if (score > best) {
        best = score;
        localStorage.setItem("focusBest", best);
        focusBest.textContent = best;
    }
}

function startGame() {
    questionIndex = 0;
    score = 0;
    stars = 0;
    streak = 0;
    answered = false;

    gameQuestions = shuffle(questions[level]);

    focusWin.hidden = true;
    document.querySelector(".focus-card").hidden = false;
    document.querySelector(".focus-scoreboard").hidden = false;

    updateScoreboard();
    showQuestion();
}

function showQuestion() {
    answered = false;

    const question = gameQuestions[questionIndex];

    focusQuestionNumber.textContent = `Question ${questionIndex + 1} / 10`;
    focusQuestion.textContent = `Find the ${question.target}!`;
    focusFeedback.textContent = "Look carefully and tap the correct object!";
    focusFeedback.style.color = "#6750a4";

    nextFocus.disabled = true;
    nextFocus.textContent = questionIndex === 9 ? "See Results 🏆" : "Next Question ➜";

    focusVisual.innerHTML = "";

    shuffle(question.objects).forEach(object => {
        const button = document.createElement("button");
        button.className = "object-option";
        button.textContent = object;
        button.setAttribute("aria-label", `Choose ${object}`);

        button.addEventListener("click", () => checkAnswer(button, object, question.target));

        focusVisual.appendChild(button);
    });
}

function checkAnswer(button, selected, target) {
    if (answered) return;

    if (selected === target) {
        answered = true;
        score += 10;
        stars++;
        streak++;

        button.classList.add("correct");
        focusFeedback.textContent = "🎉 Excellent! You found it!";
        focusFeedback.style.color = "#269b50";

        playTone(700);

        document.querySelectorAll(".object-option").forEach(option => {
            option.disabled = true;
        });

        updateScoreboard();
        nextFocus.disabled = false;
    } else {
        button.classList.add("wrong");
        button.disabled = true;

        streak = 0;
        updateScoreboard();

        focusFeedback.textContent = "😊 Not quite! Try another object.";
        focusFeedback.style.color = "#d65b5b";

        playTone(220);
    }
}

function finishGame() {
    document.querySelector(".focus-card").hidden = true;
    document.querySelector(".focus-scoreboard").hidden = true;

    focusWin.hidden = false;
    focusFinalStars.textContent = "⭐".repeat(Math.max(1, Math.min(5, stars)));

    playTone(850, 300);
}

nextFocus.addEventListener("click", () => {
    if (!answered) return;

    questionIndex++;

    if (questionIndex >= 10) {
        finishGame();
    } else {
        showQuestion();
    }
});

document.querySelectorAll(".level-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".level-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        level = button.dataset.level;
        startGame();
    });
});

document.getElementById("restartFocus").addEventListener("click", startGame);

document.getElementById("focusSound").addEventListener("click", event => {
    soundOn = !soundOn;
    event.target.textContent = soundOn ? "🔊 Sound On" : "🔇 Sound Off";

    if (soundOn) playTone(600);
});

document.getElementById("playFocusAgain").addEventListener("click", startGame);

startGame();
