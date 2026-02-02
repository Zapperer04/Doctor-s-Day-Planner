document.addEventListener("DOMContentLoaded", () => {
  const appointmentList = document.getElementById("appointmentList");
  const addBtn = document.getElementById("addAppointmentBtn");
  const searchInput = document.getElementById("search");

  // Load stored appointments
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  // === Add default data if none exists ===
  if (appointments.length === 0) {
    appointments = [
      { name: "John Doe", date: "2025-11-10", time: "10:00 AM", reason: "Checkup" },
      { name: "Dr. Emily Carter", date: "2025-11-12", time: "02:00 PM", reason: "Follow-up" },
      { name: "Mark Johnson", date: "2025-11-13", time: "11:30 AM", reason: "Consultation" }
    ];
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }

  // === Display Appointments ===
  function renderAppointments(filtered = appointments) {
    appointmentList.innerHTML = "";

    if (filtered.length === 0) {
      appointmentList.innerHTML = "<p>No appointments found.</p>";
      return;
    }

    filtered.forEach((app, index) => {
      const card = document.createElement("div");
      card.className = "appointment-card";

      card.innerHTML = `
        <div class="appointment-info">
          <h4>${app.name}</h4>
          <p>${app.date} at ${app.time}</p>
          <p><strong>Reason:</strong> ${app.reason || "—"}</p>
        </div>
        <div class="appointment-actions">
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;

      appointmentList.appendChild(card);
    });
  }

  renderAppointments();

  // === Add New Appointment ===
  addBtn.addEventListener("click", () => {
    const name = prompt("Enter Patient Name:");
    const date = prompt("Enter Date (YYYY-MM-DD):");
    const time = prompt("Enter Time (e.g. 10:00 AM):");
    const reason = prompt("Enter Reason for Visit:");

    if (!name || !date || !time) {
      alert("Please fill in all fields!");
      return;
    }

    const newAppointment = { name, date, time, reason };
    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));
    renderAppointments();
    alert("Appointment added successfully!");
  });

  // === Delete Appointment ===
  appointmentList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      appointments.splice(index, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      renderAppointments();
    }
  });

  // === Search Functionality ===
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = appointments.filter(app =>
      app.name.toLowerCase().includes(term)
    );
    renderAppointments(filtered);
  });
});
