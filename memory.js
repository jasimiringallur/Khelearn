
// ========================================
// BRAINBOOST - MEMORY MAGIC UPGRADED
// ========================================

// PICTURES
const pictures = [
  "🐶", "🐱", "🦁", "🐸",
  "🐼", "🐵", "🦋", "🐰"
];

// DIFFICULTY
const levels = {
  easy: 4,
  medium: 6,
  hard: 8
};

// HTML ELEMENTS
const board = document.getElementById("gameBoard");
const starsDisplay = document.getElementById("stars");
const matchesDisplay = document.getElementById("matches");
const movesDisplay = document.getElementById("moves");
const bestScoreDisplay = document.getElementById("bestScore");
const gameMessage = document.getElementById("gameMessage");

const winMessage = document.getElementById("winMessage");
const finalStars = document.getElementById("finalStars");

const restartButton = document.getElementById("restartButton");
const playAgainButton = document.getElementById("playAgainButton");
const soundButton = document.getElementById("soundButton");

const levelButtons = document.querySelectorAll(".level-btn");

// GAME VARIABLES
let selectedLevel = "easy";
let cards = [];
let firstCard = null;
let secondCard = null;
let locked = false;

let moves = 0;
let matches = 0;
let stars = 0;

let soundEnabled = true;
let gameTimer = null;
let audioContext = null;

// ========================================
// SOUND EFFECTS
// ========================================

function playSound(frequency, duration = 0.15) {

  if (!soundEnabled) return;

  try {

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
      0.15,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);

  } catch (error) {
    console.log("Sound unavailable:", error);
  }
}

// ========================================
// SHUFFLE CARDS
// ========================================

function shuffle(array) {

  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] =
      [shuffled[j], shuffled[i]];

  }

  return shuffled;
}

// ========================================
// BEST SCORE
// ========================================

function getBestScore() {

  return localStorage.getItem(
    "brainboost-best-" + selectedLevel
  );

}

function updateBestScore() {

  const best = getBestScore();

  bestScoreDisplay.textContent =
    best === null ? "--" : best;

}

function saveBestScore() {

  const previousBest = getBestScore();

  if (
    previousBest === null ||
    moves < Number(previousBest)
  ) {

    localStorage.setItem(
      "brainboost-best-" + selectedLevel,
      moves
    );

    gameMessage.textContent =
      "🌟 New personal best! Amazing work!";

  }

  updateBestScore();

}

// ========================================
// START GAME
// ========================================

function startGame() {

  clearTimeout(gameTimer);

  const pairCount = levels[selectedLevel];

  const selectedPictures =
    pictures.slice(0, pairCount);

  cards = shuffle([
    ...selectedPictures,
    ...selectedPictures
  ]);

  moves = 0;
  matches = 0;
  stars = 0;

  firstCard = null;
  secondCard = null;
  locked = false;

  winMessage.hidden = true;

  document.querySelectorAll(".confetti")
    .forEach(item => item.remove());

  updateScore();
  updateBestScore();

  gameMessage.textContent =
    "Let's find some matching pictures! 💜";

  board.innerHTML = "";

  board.style.gridTemplateColumns =
    pairCount === 4
      ? "repeat(4, minmax(0, 1fr))"
      : "repeat(4, minmax(0, 1fr))";

  cards.forEach(picture => {

    const card = document.createElement("button");

    card.className = "memory-card";
    card.textContent = "❓";
    card.dataset.picture = picture;

    card.setAttribute("aria-label", "Hidden picture");

    card.addEventListener("click", () => {
      flipCard(card);
    });

    board.appendChild(card);

  });

}

// ========================================
// FLIP CARD
// ========================================

function flipCard(card) {

  if (locked) return;

  if (card.classList.contains("flipped")) return;

  if (card.classList.contains("matched")) return;

  card.textContent = card.dataset.picture;

  card.classList.add("flipped");

  card.setAttribute(
    "aria-label",
    "Picture " + card.dataset.picture
  );

  playSound(450);

  if (!firstCard) {

    firstCard = card;
    return;

  }

  secondCard = card;

  moves++;

  updateScore();

  checkMatch();

}

// ========================================
// CHECK MATCH
// ========================================

function checkMatch() {

  const isMatch =
    firstCard.dataset.picture ===
    secondCard.dataset.picture;

  if (isMatch) {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.disabled = true;
    secondCard.disabled = true;

    matches++;
    stars++;

    playSound(700, 0.25);

    gameMessage.textContent =
      "Wonderful! You found a matching pair! ⭐";

    resetTurn();
    updateScore();

    if (matches === levels[selectedLevel]) {

      locked = true;

      gameTimer = setTimeout(finishGame, 700);

    }

  } else {

    locked = true;

    playSound(220);

    gameMessage.textContent =
      "Good try! Let's find another pair! 💜";

    gameTimer = setTimeout(() => {

      firstCard.textContent = "❓";
      secondCard.textContent = "❓";

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.setAttribute("aria-label", "Hidden picture");
      secondCard.setAttribute("aria-label", "Hidden picture");

      resetTurn();

    }, 1000);

  }

}

// ========================================
// RESET TURN
// ========================================

function resetTurn() {

  firstCard = null;
  secondCard = null;

  locked = false;

}

// ========================================
// UPDATE SCORE
// ========================================

function updateScore() {

  starsDisplay.textContent = stars;

  matchesDisplay.textContent =
    matches + " / " + levels[selectedLevel];

  movesDisplay.textContent = moves;

}

// ========================================
// CONFETTI CELEBRATION
// ========================================

function launchConfetti() {

  const colors = [
    "#ff8969",
    "#7865dc",
    "#55b991",
    "#ffd166",
    "#ff69b4"
  ];

  for (let i = 0; i < 70; i++) {

    const piece = document.createElement("div");

    piece.className = "confetti";

    piece.style.left = Math.random() * 100 + "vw";

    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.animationDelay =
      Math.random() * 1.5 + "s";

    piece.style.animationDuration =
      (2 + Math.random() * 2) + "s";

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4500);

  }

}

// ========================================
// FINISH GAME
// ========================================

function finishGame() {

  locked = true;

  saveBestScore();

  gameMessage.textContent =
    "You are a Memory Magic Champion! 🏆";

  finalStars.textContent =
    "⭐".repeat(stars);

  winMessage.hidden = false;

  launchConfetti();

  playSound(523, 0.25);

  setTimeout(() => playSound(659, 0.25), 200);

  setTimeout(() => playSound(784, 0.4), 400);

}

// ========================================
// DIFFICULTY SELECTION
// ========================================

levelButtons.forEach(button => {

  button.addEventListener("click", () => {

    levelButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedLevel = button.dataset.level;

    startGame();

  });

});

// ========================================
// SOUND ON / OFF
// ========================================

soundButton.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  soundButton.textContent =
    soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";

  if (soundEnabled) {
    playSound(600);
  }

});

// ========================================
// RESTART BUTTONS
// ========================================

restartButton.addEventListener("click", startGame);

playAgainButton.addEventListener("click", startGame);

// ========================================
// START FIRST GAME
// ========================================

startGame();
