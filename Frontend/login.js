const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  if (email === "" || password === "") {
    alert("Please fill in both email and password!");
    return;
  }

  // Temporary login — accept any credentials
  if (rememberMe) {
    localStorage.setItem("userEmail", email);
  } else {
    sessionStorage.setItem("userEmail", email);
  }

  alert("Login successful!");
  window.location.href = "dashboard.html";
});
