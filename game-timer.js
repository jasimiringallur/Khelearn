(function () {
  function createKhelearnGameTimer({ onStart, getFinalScore, onTimeUp = function () {} }) {
    const setup = document.getElementById("gameTimerSetup");
    const timeLimit = document.getElementById("gameTimeLimit");
    const startButton = document.getElementById("gameTimerStart");
    const display = document.getElementById("gameTimerDisplay");
    const timeValue = document.getElementById("gameTimerValue");

    if (!setup || !timeLimit || !startButton || !display || !timeValue) {
      throw new Error("Game timer controls are missing from this page.");
    }

    const dialog = document.createElement("dialog");
    dialog.className = "game-time-up";
    dialog.setAttribute("aria-labelledby", "gameTimeUpTitle");
    dialog.innerHTML = `
      <div class="game-time-up-content">
        <div class="game-time-up-icon" aria-hidden="true">⏰</div>
        <h2 id="gameTimeUpTitle">Time's Up!</h2>
        <p>Your Khelearn adventure was wonderful. Here's your final score:</p>
        <p class="game-time-up-score" id="gameTimeUpScore"></p>
        <button type="button" class="game-time-up-button">Play Again</button>
      </div>
    `;
    document.body.appendChild(dialog);

    const finalScore = dialog.querySelector("#gameTimeUpScore");
    const playAgainButton = dialog.querySelector(".game-time-up-button");
    let intervalId = null;
    let deadline = 0;
    let duration = 0;
    let active = false;

    function stop() {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }

      active = false;
    }

    function render(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      timeValue.textContent =
        `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
      display.classList.toggle("is-warning", seconds <= 30);
    }

    function expire() {
      stop();
      timeValue.textContent = "00:00";
      display.classList.add("is-warning");
      onTimeUp();
      finalScore.textContent = getFinalScore();

      if (!dialog.open) {
        dialog.showModal();
      }

      playAgainButton.focus();
    }

    function update() {
      if (!active || duration === 0) return;

      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      render(remaining);

      if (remaining === 0) {
        expire();
      }
    }

    function start() {
      stop();

      if (dialog.open) {
        dialog.close();
      }

      const selectedDuration = Number(timeLimit.value);
      if (!Number.isInteger(selectedDuration) || selectedDuration < 0) {
        throw new RangeError("Choose a valid game time.");
      }

      if (onStart() === false) {
        return false;
      }

      active = true;
      duration = selectedDuration;
      setup.hidden = true;
      display.hidden = false;
      display.classList.remove("is-warning", "is-unlimited");

      if (duration === 0) {
        timeValue.textContent = "Unlimited";
        display.classList.add("is-unlimited");
        return true;
      }

      deadline = Date.now() + duration * 1000;
      update();
      intervalId = window.setInterval(update, 1000);
      return true;
    }

    function reset() {
      stop();

      if (dialog.open) {
        dialog.close();
      }

      setup.hidden = false;
      display.hidden = true;
      display.classList.remove("is-warning", "is-unlimited");
      timeValue.textContent = "00:00";
    }

    startButton.addEventListener("click", start);
    playAgainButton.addEventListener("click", start);
    dialog.addEventListener("cancel", event => event.preventDefault());
    window.addEventListener("pagehide", stop);

    return {
      start,
      stop,
      reset,
      isActive: () => active
    };
  }

  window.createKhelearnGameTimer = createKhelearnGameTimer;
})();
