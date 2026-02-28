// --- Digital Habits Risk ---
function calculateRisk() {
  let privacy = 0;
  let security = 0;
  let reputation = 0;

  const checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(box => {
    if (box.checked) {
      const value = parseInt(box.value);
      const category = box.dataset.category;
      if (category === "privacy") privacy += value;
      if (category === "security") security += value;
      if (category === "reputation") reputation += value;
    }
  });

  const total = Math.round((privacy + security + reputation) / 3);

  // Update Risk Bar
  const riskBar = document.getElementById("riskBar");
  riskBar.style.width = total + "%";
  riskBar.style.background = total < 30 ? "green" : total < 60 ? "orange" : "red";

  // Update Score Text
  let level = total < 30 ? "Low Risk 🟢" : total < 60 ? "Medium Risk 🟡" : "High Risk 🔴";
  document.getElementById("scoreOutput").innerText =
    "Overall Risk Score: " + total + " — " + level;

  document.getElementById("breakdown").innerText =
    "Privacy: " + privacy + " | Security: " + security + " | Reputation: " + reputation;

  document.getElementById("advice").innerHTML = generateAdvice(privacy, security, reputation);

  updateRadarChart(privacy, security, reputation);
}

// --- Personalized Advice ---
function generateAdvice(p, s, r) {
  let advice = "<strong>Recommendations:</strong><br>";
  if (p > 20) advice += "• Make accounts private and limit location sharing.<br>";
  if (s > 20) advice += "• Use unique passwords & enable 2FA.<br>";
  if (r > 20) advice += "• Review and remove posts that may affect your reputation.<br>";
  if (p + s + r === 0) advice += "• Excellent digital safety habits! ✅<br>";
  return advice;
}

// --- URL Analyzer ---
function analyzeURL() {
  const url = document.getElementById("urlInput").value.trim();
  let risk = 0;
  let reasons = [];

  if (!url.startsWith("https")) {
    risk += 20;
    reasons.push("URL is not HTTPS (not secure)");
  }
  if (url.includes("free") || url.includes("urgent") || url.includes("salary upfront")) {
    risk += 15;
    reasons.push("Contains suspicious keywords (free/urgent/salary upfront)");
  }
  if (url.includes("linkedin.com") || url.includes("indeed.com")) {
    risk -= 10;
    reasons.push("Known safe site");
  }

  risk = Math.max(0, risk);

  let riskText = risk < 10 ? "Low Risk 🟢" : risk < 30 ? "Medium Risk 🟡" : "High Risk 🔴";
  let color = risk < 10 ? "green" : risk < 30 ? "orange" : "red";

  const resultDiv = document.getElementById("urlResult");
  resultDiv.style.backgroundColor = color;
  resultDiv.innerHTML = `<strong>${riskText}</strong><br>${reasons.join("<br>") || "No major issues detected."}`;
}

// --- Radar Chart ---
const ctx = document.getElementById("radarChart").getContext("2d");
const radarChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['Privacy', 'Security', 'Reputation'],
    datasets: [{
      label: 'Risk Levels',
      data: [0,0,0],
      backgroundColor: 'rgba(42,82,152,0.2)',
      borderColor: '#2a5298',
      borderWidth: 2,
      pointBackgroundColor: '#2a5298'
    }]
  },
  options: {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  }
});

function updateRadarChart(p, s, r) {
  radarChart.data.datasets[0].data = [p, s, r];
  radarChart.update();
}
