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

  const riskBar = document.getElementById("riskBar");
  riskBar.style.width = total + "%";

  if (total < 30) {
    riskBar.style.background = "green";
  } else if (total < 60) {
    riskBar.style.background = "orange";
  } else {
    riskBar.style.background = "red";
  }

  let level = "";
  if (total < 30) {
    level = "Low Risk 🟢";
  } else if (total < 60) {
    level = "Medium Risk 🟡";
  } else {
    level = "High Risk 🔴";
  }

  document.getElementById("scoreOutput").innerText =
    "Overall Risk Score: " + total + " — " + level;

  document.getElementById("breakdown").innerText =
    "Privacy: " + privacy +
    " | Security: " + security +
    " | Reputation: " + reputation;

  document.getElementById("advice").innerHTML = generateAdvice(privacy, security, reputation);
}

function generateAdvice(p, s, r) {
  let advice = "<strong>Recommendations:</strong><br>";

  if (p > 20) advice += "• Consider making accounts private and limiting location sharing.<br>";
  if (s > 20) advice += "• Use unique passwords and enable two-factor authentication.<br>";
  if (r > 20) advice += "• Review and clean up older posts that may affect your reputation.<br>";
  if (p + s + r === 0) advice += "• Excellent digital safety habits! Keep it up.<br>";

  return advice;
}
