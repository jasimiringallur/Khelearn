
/* ======================================
   BRAINBOOST - MATH ADVENTURE
====================================== */

// GAME SETTINGS

const TOTAL_QUESTIONS = 10;

const categories = [
  "counting",
  "addition",
  "subtraction",
  "shapes"
];

const shapes = [
  { name: "Circle", emoji: "🔴" },
  { name: "Square", emoji: "🟦" },
  { name: "Triangle", emoji: "🔺" },
  { name: "Star", emoji: "⭐" }
];

// HTML ELEMENTS

const mathStars = document.getElementById("mathStars");
const mathScore = document.getElementById("mathScore");
const mathStreak = document.getElementById("mathStreak");

const questionText = document.getElementById("questionText");
const questionVisual = document.getElementById("questionVisual");
const questionNumber = document.getElementById("questionNumber");

const answerOptions = document.getElementById("answerOptions");
const mathFeedback = document.getElementById("mathFeedback");

const nextQuestion = document.getElementById("nextQuestion");
const restartMath = document.getElementById("restartMath");
const mathSound = document.getElementById("mathSound");

const mathWin = document.getElementById("mathWin");
const mathFinalStars = document.getElementById("mathFinalStars");
const playMathAgain = document.getElementById("playMathAgain");

const questionCard = document.querySelector(".question-card");

const categoryButtons =
  document.querySelectorAll(".category-btn");

// GAME VARIABLES

let selectedCategory = "counting";

let score = 0;
let stars = 0;
let streak = 0;

let questionIndex = 0;
let currentAnswer = null;
let answered = false;

let soundEnabled = true;
let audioContext = null;
let hasStarted = false;

// SHUFFLE ANSWERS

function shuffle(array) {

  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] =
      [result[j], result[i]];

  }

  return result;
}

// RANDOM NUMBER

function randomNumber(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

}

// CREATE ANSWER OPTIONS

function makeOptions(answer, type = "number") {

  let options = [answer];

  if (type === "shape") {

    const otherShapes = shapes
      .map(shape => shape.name)
      .filter(name => name !== answer);

    options.push(...shuffle(otherShapes).slice(0, 2));

  } else {

    while (options.length < 3) {

      const difference = randomNumber(1, 4);

      const candidate =
        Math.max(0, answer + (Math.random() < 0.5
          ? difference
          : -difference));

      if (!options.includes(candidate)) {
        options.push(candidate);
      }

    }

  }

  return shuffle(options);

}

// GENERATE COUNTING QUESTION

function createCountingQuestion() {

  const answer = randomNumber(1, 10);

  return {
    prompt: "How many apples do you see?",
    visual: "🍎 ".repeat(answer),
    answer: answer,
    options: makeOptions(answer)
  };

}

// GENERATE ADDITION QUESTION

function createAdditionQuestion() {

  const first = randomNumber(1, 10);
  const second = randomNumber(1, 10);

  const answer = first + second;

  return {
    prompt: "What is the answer?",
    visual: `${first} ➕ ${second} = ❓`,
    answer: answer,
    options: makeOptions(answer)
  };

}

// GENERATE SUBTRACTION QUESTION

function createSubtractionQuestion() {

  const first = randomNumber(2, 10);
  const second = randomNumber(1, first);

  const answer = first - second;

  return {
    prompt: "Solve this subtraction!",
    visual: `${first} ➖ ${second} = ❓`,
    answer: answer,
    options: makeOptions(answer)
  };

}

// GENERATE SHAPE QUESTION

function createShapeQuestion() {

  const shape =
    shapes[randomNumber(0, shapes.length - 1)];

  return {
    prompt: "What shape is this?",
    visual: shape.emoji,
    answer: shape.name,
    options: makeOptions(shape.name, "shape")
  };

}

// CREATE QUESTION

function createQuestion() {

  if (selectedCategory === "counting") {
    return createCountingQuestion();
  }

  if (selectedCategory === "addition") {
    return createAdditionQuestion();
  }

  if (selectedCategory === "subtraction") {
    return createSubtractionQuestion();
  }

  if (selectedCategory === "shapes") {
    return createShapeQuestion();
  }

}

// SOUND EFFECTS

function playMathSound(frequency, duration = 0.2) {

  if (!soundEnabled) return;

  try {

    const AudioClass =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioClass) return;

    if (!audioContext) {
      audioContext = new AudioClass();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
      0.12,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + duration
    );

  } catch (error) {

    console.log("Sound unavailable:", error);

  }

}

// UPDATE SCORE

function updateMathScore() {

  mathStars.textContent = stars;
  mathScore.textContent = score;
  mathStreak.textContent = streak;

}

// DISPLAY QUESTION

function displayQuestion() {

  if (questionIndex >= TOTAL_QUESTIONS) {
    finishMathGame();
    return;
  }

  answered = false;

  const question = createQuestion();

  currentAnswer = question.answer;

  questionText.textContent = question.prompt;

  questionVisual.textContent = question.visual;

  questionNumber.textContent =
    `Question ${questionIndex + 1} / ${TOTAL_QUESTIONS}`;

  mathFeedback.textContent =
    "Choose your answer! 🌟";

  nextQuestion.disabled = true;

  answerOptions.innerHTML = "";

  question.options.forEach(option => {

    const button = document.createElement("button");

    button.className = "answer-btn";

    button.textContent = option;

    button.addEventListener("click", () => {

      checkMathAnswer(option, button);

    });

    answerOptions.appendChild(button);

  });

}

// CHECK ANSWER

function checkMathAnswer(option, selectedButton) {

  if (!gameTimer.isActive() || answered) return;

  answered = true;

  const buttons =
    answerOptions.querySelectorAll(".answer-btn");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (option === currentAnswer) {

    selectedButton.classList.add("correct");

    score += 10;
    stars++;
    streak++;

    mathFeedback.textContent =
      "🎉 Excellent! You got it right!";

    playMathSound(700, 0.25);

    setTimeout(() => {
      playMathSound(900, 0.25);
    }, 150);

  } else {

    selectedButton.classList.add("wrong");

    buttons.forEach(button => {

      if (
        String(button.textContent) ===
        String(currentAnswer)
      ) {
        button.classList.add("correct");
      }

    });

    streak = 0;

    mathFeedback.textContent =
      `Good try! The correct answer is ${currentAnswer}. 💜`;

    playMathSound(250, 0.3);

  }

  updateMathScore();

  nextQuestion.disabled = false;

}

// NEXT QUESTION

function goToNextQuestion() {

  if (!gameTimer.isActive() || !answered) return;

  questionIndex++;

  displayQuestion();

}

// FINISH GAME

function finishMathGame() {

  gameTimer.stop();
  questionCard.hidden = true;

  mathWin.hidden = false;

  mathFinalStars.textContent =
    "⭐".repeat(stars);

  playMathSound(523, 0.3);

  setTimeout(() => {
    playMathSound(659, 0.3);
  }, 200);

  setTimeout(() => {
    playMathSound(784, 0.4);
  }, 400);

}

// START GAME

function initializeMathGame() {
  hasStarted = true;
  score = 0;
  stars = 0;
  streak = 0;

  questionIndex = 0;
  currentAnswer = null;
  answered = false;

  mathWin.hidden = true;
  questionCard.hidden = false;
  document.querySelector(".math-scoreboard").hidden = false;
  document.querySelector(".math-controls").hidden = false;
  restartMath.hidden = false;

  updateMathScore();

  displayQuestion();

}

const gameTimer = window.createKhelearnGameTimer({
  onStart: initializeMathGame,
  getFinalScore: () => `Score: ${score} points • Stars: ${stars}`
});

function startMathGame() {
  return gameTimer.start();
}

// CATEGORY SELECTION

categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    selectedCategory = button.dataset.category;

    if (hasStarted) startMathGame();

  });

});

// NEXT BUTTON

nextQuestion.addEventListener("click", goToNextQuestion);

// RESTART BUTTON

restartMath.addEventListener("click", startMathGame);

// SOUND BUTTON

mathSound.addEventListener("click", () => {

  soundEnabled = !soundEnabled;

  mathSound.textContent =
    soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";

  if (soundEnabled) {
    playMathSound(600);
  }

});

// PLAY AGAIN

playMathAgain.addEventListener("click", startMathGame);

updateMathScore();
