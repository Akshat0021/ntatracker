const outputDiv = document.getElementById("output");
const statusDiv = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const beep = document.getElementById("beep");

const BACKEND_URL = "https://YOUR-BACKEND-RENDER-URL.onrender.com/logs";

let polling = false;

startBtn.addEventListener("click", () => {
  if (!polling) {
    polling = true;
    startBtn.textContent = "Tracking...";
    pollLogs();
  }
});

function pollLogs() {
  fetch(BACKEND_URL)
    .then(res => res.json())
    .then(data => {
      outputDiv.innerHTML = data.logs.map(log => `<div>${log}</div>`).join("");
      outputDiv.scrollTop = outputDiv.scrollHeight;
      if (data.status === "FOUND") {
        statusDiv.innerHTML = `<p>🎉 Found PDF: <a href="${data.url}" target="_blank">${data.url}</a></p>`;
        beep.play();
        polling = false;
        startBtn.textContent = "Start Tracking";
      } else {
        setTimeout(pollLogs, 2000);
      }
    })
    .catch(err => {
      outputDiv.innerHTML += `<div style="color:red;">Error fetching logs</div>`;
      polling = false;
      startBtn.textContent = "Start Tracking";
    });
}
