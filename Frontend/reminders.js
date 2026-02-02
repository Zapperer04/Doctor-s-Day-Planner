const reminderText = document.getElementById("reminderText");
const reminderTime = document.getElementById("reminderTime");
const addReminderBtn = document.getElementById("addReminderBtn");
const reminderList = document.getElementById("reminderList");

document.addEventListener("DOMContentLoaded", loadReminders);

function loadReminders() {
  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.forEach(r => addReminderToDOM(r.text, r.time));
}

addReminderBtn.addEventListener("click", () => {
  const text = reminderText.value.trim();
  const time = reminderTime.value;

  if (text === "" || time === "") return alert("Please fill all fields!");

  addReminderToDOM(text, time);
  saveReminder(text, time);

  reminderText.value = "";
  reminderTime.value = "";
});

function addReminderToDOM(text, time) {
  const div = document.createElement("div");
  div.classList.add("reminder-item");

  const spanText = document.createElement("span");
  spanText.classList.add("reminder-text");
  spanText.textContent = text;

  const spanTime = document.createElement("span");
  spanTime.classList.add("reminder-time");
  spanTime.textContent = formatDateTime(time);

  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-reminder");
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", () => {
    div.remove();
    deleteReminder(text, time);
  });

  div.appendChild(spanText);
  div.appendChild(spanTime);
  div.appendChild(delBtn);
  reminderList.appendChild(div);
}

function saveReminder(text, time) {
  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders.push({ text, time });
  localStorage.setItem("reminders", JSON.stringify(reminders));
}

function deleteReminder(text, time) {
  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  const updated = reminders.filter(r => !(r.text === text && r.time === time));
  localStorage.setItem("reminders", JSON.stringify(updated));
}

function formatDateTime(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}
