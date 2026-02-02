// === Smooth scroll for "Get Started" button ===
document.getElementById("getStartedBtn").addEventListener("click", function() {
  document.getElementById("features").scrollIntoView({ behavior: "smooth" });
});

// === Fade-in animation for quote section on scroll ===
window.addEventListener("scroll", () => {
  const quote = document.getElementById("quote");
  const position = quote.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight - 100) {
    quote.style.opacity = "1";
    quote.style.transition = "opacity 1.2s ease-in";
  }
});

// === Protect Dashboard link ===
document.addEventListener("DOMContentLoaded", () => {
  const dashboardLink = document.querySelector('a[href="dashboard.html"]');

  if (dashboardLink) {
    dashboardLink.addEventListener("click", (e) => {
      const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

      if (!userEmail) {
        e.preventDefault();
        alert("Please login first to access the dashboard!");
        window.location.href = "login.html";
      }
    });
  }
});
