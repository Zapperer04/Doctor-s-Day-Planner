document.addEventListener("DOMContentLoaded", () => {
  // === LOGIN CHECK ===
  const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
  if (!userEmail) {
    alert("Please login first to access the dashboard!");
    window.location.href = "login.html";
    return;
  }

  // === WELCOME MESSAGE ===
  const welcomeText = document.querySelector("h2");
  welcomeText.textContent = `Welcome, Dr. ${userEmail.split("@")[0]}`;

  // === DATE DISPLAY ===
  const calendar = document.getElementById("calendar");
  const date = new Date();
  calendar.innerHTML = `
    <p><strong>${date.toLocaleString("default", { month: "long" })}</strong> ${date.getFullYear()}</p>
    <p>Today: ${date.toDateString()}</p>
  `;

  // === LOAD DASHBOARD DATA ===
  loadAppointments();
  loadTasks();
  loadReminders();

  // === LOGOUT ===
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");
    window.location.href = "login.html";
  });
});

// === Load Appointments ===
function loadAppointments() {
  const list = document.getElementById("appointmentsList");
  list.innerHTML = "";

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  if (appointments.length === 0) {
    list.innerHTML = "<li>No appointments scheduled.</li>";
    return;
  }

  appointments.forEach(app => {
    const li = document.createElement("li");
    li.textContent = `${app.name} - ${app.date} at ${app.time}`;
    list.appendChild(li);
  });
}

// === Load Tasks ===
function loadTasks() {
  const list = document.getElementById("tasksList");
  list.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length === 0) {
    list.innerHTML = "<li>No tasks yet.</li>";
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text + (task.completed ? " ✅" : "");
    list.appendChild(li);
  });
}

// === Load Reminders ===
function loadReminders() {
  const list = document.getElementById("remindersList");
  list.innerHTML = "";

  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  if (reminders.length === 0) {
    list.innerHTML = "<li>No reminders set.</li>";
    return;
  }

  reminders.forEach(r => {
    const li = document.createElement("li");
    const date = new Date(r.time);
    li.textContent = `${r.text} — ${date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`;
    list.appendChild(li);
  });
}
