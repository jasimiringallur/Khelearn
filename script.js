
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // KHELEARN - GAME SELECTION SYSTEM
    // =====================================

    console.log("Khelearn JavaScript loaded!");

    // GAME PAGE DETAILS
    const gamePages = {
        "Memory Magic": "memory.html",
        "Math Adventure": "math.html",
        "Logic Land": "puzzle.html",
        "Brain Puzzle": "puzzle.html",
        "Word Wonder": "word.html",
        "Focus Finder": "focus.html",

        // Also support filename-based data-game values
        "memory.html": "memory.html",
        "math.html": "math.html",
        "puzzle.html": "puzzle.html",
        "word.html": "word.html",
        "focus.html": "focus.html"
    };

    // SELECT HTML ELEMENTS
    const gameCards = document.querySelectorAll(".game-card");

    const popup = document.getElementById("playModeModal");
    const playAlone = document.getElementById("playAlone");
    const playTogether = document.getElementById("playTogether");
    const closePopup = document.getElementById("closePlayMode");
    const textbookComingSoon = document.getElementById("textbookComingSoon");
    const closeTextbookComingSoon = document.getElementById("closeTextbookComingSoon");

    let selectedGame = null;

    console.log("Game cards found:", gameCards.length);

    if (textbookComingSoon && closeTextbookComingSoon) {
        document.querySelectorAll("[data-textbook-coming-soon]").forEach(function (trigger) {
            trigger.addEventListener("click", function () {
                textbookComingSoon.showModal();
            });
        });

        closeTextbookComingSoon.addEventListener("click", function () {
            textbookComingSoon.close();
        });
    }

    // CHECK POPUP ELEMENTS
    if (!popup || !playAlone || !playTogether || !closePopup) {
        console.error("Popup elements missing! Check HTML IDs.");
    } else {

        // GAME CARD CLICK
        gameCards.forEach(function (card) {

            card.addEventListener("click", function () {

                console.log("Game card clicked!");

                selectedGame = card.dataset.game;

                console.log("Selected game:", selectedGame);

                if (gamePages[selectedGame]) {
                    popup.hidden = false;
                } else {
                    console.error("Game page not found:", selectedGame);
                }

            });

        });

        // PLAY ALONE
        playAlone.addEventListener("click", function () {

            if (selectedGame && gamePages[selectedGame]) {
                window.location.href = gamePages[selectedGame];
            }

        });

        // PLAY TOGETHER
        playTogether.addEventListener("click", function () {

            if (selectedGame && gamePages[selectedGame]) {

                sessionStorage.setItem(
                    "selectedTogetherGame",
                    selectedGame
                );

                window.location.href = "together.html";
            }

        });

        // CLOSE POPUP
        closePopup.addEventListener("click", function () {
            popup.hidden = true;
        });

        // CLOSE POPUP WHEN CLICKING OUTSIDE
        popup.addEventListener("click", function (event) {

            if (event.target === popup) {
                popup.hidden = true;
            }

        });

    }

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navLinks.querySelectorAll("a, .nav-feature-trigger").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.textContent = "☰";

            });

        });

    }

    console.log("Khelearn homepage loaded successfully!");

});
// KHELEARN FEEDBACK - GOOGLE SHEETS

(() => {

  const ratingStars = document.querySelectorAll(".rating-star");
  const ratingText = document.getElementById("ratingText");
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackMessage = document.getElementById("feedbackMessage");
  const feedbackSuccess = document.getElementById("feedbackSuccess");

  // YOUR GOOGLE APPS SCRIPT WEB APP URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmyxNOBVbfqjfHo1uThkFs5YPzyNAWHX7KideD-BxB-bLMT3MnZP1ZpAyirsnt2vA/exec";

  if (!ratingStars.length || !feedbackForm) return;

  let selectedRating = 0;

  const ratingLabels = [
    "Poor",
    "Fair",
    "Good",
    "Very good",
    "Excellent!"
  ];

  // Star selection
  ratingStars.forEach((star) => {

    star.addEventListener("click", () => {

      selectedRating = Number(star.dataset.rating);

      ratingStars.forEach((item) => {
        item.classList.toggle(
          "active",
          Number(item.dataset.rating) <= selectedRating
        );
      });

      ratingText.textContent =
        ratingLabels[selectedRating - 1];

      feedbackSuccess.textContent = "";

    });

  });

  // Submit feedback
  feedbackForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (selectedRating === 0) {
      ratingText.textContent =
        "Please select a star rating first.";
      return;
    }

    const message = feedbackMessage.value.trim();

    if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
      feedbackSuccess.textContent =
        "Please configure the Google Sheets connection.";

      return;
    }

    const submitButton = feedbackForm.querySelector(
      ".feedback-submit"
    );

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          rating: selectedRating,
          message: message
        })
      });

      // With no-cors, the browser cannot read the server's response.
      // This indicates that the request was sent, not verified.

      feedbackSuccess.textContent =
        "Your feedback has been sent. Thank you! 🌟";

      feedbackForm.reset();

      ratingStars.forEach((star) => {
        star.classList.remove("active");
      });

      selectedRating = 0;
      ratingText.textContent = "Select your rating";

    } catch (error) {

      feedbackSuccess.textContent =
        "Something went wrong. Please try again.";

      console.error(error);

    }

    submitButton.disabled = false;
    submitButton.textContent = "Submit Feedback →";

  });

})();

// KHELEARN APP INSTALL

let installPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  if (installButton) installButton.hidden = false;
});

installButton?.addEventListener("click", async () => {
  if (!installPrompt) return;

  installButton.disabled = true;
  await installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
  installButton.disabled = false;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
  if (installButton) installButton.hidden = true;
});

// KHELEARN APP - SERVICE WORKER

if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("Khelearn app service worker registered.");
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  });
}