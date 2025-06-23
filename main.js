// ⏰ Real-time Clock
function updateTime() {
  const now = new Date();
  document.getElementById('timeDisplay').textContent = "Current Time: " + now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// 🧮 Basic Solver
function solve() {
  const expr = document.getElementById("expression").value;
  try {
    const result = eval(expr);
    document.getElementById("result").textContent = "Result: " + result;
    addToHistory(expr, result);
  } catch {
    document.getElementById("result").textContent = "Invalid expression";
  }
}

// 🔢 Append Calculator Buttons
function append(val) {
  document.getElementById("expression").value += val;
}

// 🧼 Clear Input
function clearInput() {
  document.getElementById("expression").value = "";
  document.getElementById("result").textContent = "";
}

// 🎤 Voice Input
function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("expression").value = transcript.replace(/x/g, "*");
  };
  recognition.start();
}

// 🌒 Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = document.getElementById("theme-toggle");
  icon.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// ⛶ Fullscreen Toggle
document.getElementById("fullscreen-toggle").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// 🧠 History
function addToHistory(expr, result) {
  const historyList = document.getElementById("history-list");
  const div = document.createElement("div");
  div.className = "history-item";
  div.textContent = `${expr} = ${result}`;
  historyList.prepend(div);
}

// 🔄 Unit Conversion
function convertUnits() {
  const type = document.getElementById("convert-type").value;
  const input = parseFloat(document.getElementById("convert-input").value);
  let result;

  if (isNaN(input)) {
    result = "Enter a valid number";
  } else {
    switch (type) {
      case "kg-lb":
        result = `${input} kg = ${(input * 2.20462).toFixed(2)} lbs`;
        break;
      case "m-ft":
        result = `${input} meters = ${(input * 3.28084).toFixed(2)} feet`;
        break;
      case "c-f":
        result = `${input} °C = ${((input * 9/5) + 32).toFixed(2)} °F`;
        break;
      default:
        result = "Conversion not supported.";
    }
  }

  document.getElementById("convert-result").textContent = result;
}

// ⌨️ Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
  const input = document.getElementById("expression");
  if (e.key === "Enter") solve();
  if (e.ctrlKey && e.key === "Backspace") clearInput();
});