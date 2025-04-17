async function runTracker() {
  const consoleDiv = document.getElementById("console");
  consoleDiv.innerHTML = "⏳ Running tracker...<br>";

  try {
    const response = await fetch("https://YOUR-BACKEND-URL/run");
    const data = await response.json();

    data.logs.forEach(log => {
      consoleDiv.innerHTML += log + "<br>";
    });

    if (data.success) {
      document.getElementById("beep").play();
      consoleDiv.innerHTML += "<br><strong>✅ PDF FOUND!</strong><br>" + data.url;
    } else {
      consoleDiv.innerHTML += "<br>❌ No PDF found.";
    }
  } catch (error) {
    consoleDiv.innerHTML += `<br>🚨 Error: ${error}`;
  }
}