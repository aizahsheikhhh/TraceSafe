function analyzeURL() {
  const url = document.getElementById("urlInput").value;
  let risk = 0;
  let issues = [];

  if (!url.startsWith("https")) {
    risk += 30;
    issues.push("Not HTTPS secure");
  }

  if (url.includes("free") || url.includes("urgent") || url.includes("salary")) {
    risk += 20;
    issues.push("Contains urgency or bait language");
  }

  let level;
  if (risk < 20) level = "Low Risk";
  else if (risk < 50) level = "Moderate Risk";
  else level = "High Risk";

  document.getElementById("urlResult").innerHTML =
    "<strong>Threat Level: " + level + "</strong><br>" +
    "Risk Score: " + risk + "<br>" +
    issues.join("<br>");
}
