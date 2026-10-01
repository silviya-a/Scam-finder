function analyzeText() {
    console.log("Button clicked!"); // Debug check

    const input = document.getElementById('userInput').value.trim();
    const resultBox = document.getElementById('resultBox');
    const riskLevel = document.getElementById('riskLevel');
    const riskExplanation = document.getElementById('riskExplanation');
    const redFlagsList = document.getElementById('redFlagsList');

    if (!input) {
        alert("Please paste some text first!");
        return;
    }

    redFlagsList.innerHTML = "";
    let score = 0;
    let detectedFlags = [];

    // Check 1: Registration Fee / Upfront Payment Demand
    if (/REGISTRATION FEE|FEE|fee|3200|3,200|3200\/-|शुल्क|पैसा|payment/i.test(input)) {
        score += 4;
        detectedFlags.push("Asks for upfront 'Registration Fee' (3200/-) — Legitimate jobs NEVER ask you to pay money to start working!");
    }

    // Check 2: 100% Genuine / Guaranteed Earnings
    if (/100%|Genuine|Genuine Work|गारन्टी|ग्यारेन्टी/i.test(input)) {
        score += 3;
        detectedFlags.push("Claims '100% Genuine Work' — A widespread tactic used by fraudulent data-entry operators.");
    }

    // Check 3: Typing / Data Entry Work from Home
    if (/typing|data|entry|screen|mobile|laptop|घर\/अफिस|घरमै बसेर/i.test(input)) {
        score += 2;
        detectedFlags.push("Offers easy mobile/laptop typing or data-entry work from home.");
    }

    // Check 4: Unrealistic income promises
    if (/21,700|21700|monthly|daily|weekly|esewa|khalti|bank/i.test(input)) {
        score += 2;
        detectedFlags.push("Promises fixed high salary (21,700/month) for simple copy-typing work.");
    }

    // Always show the result box
    resultBox.style.display = "block";
    resultBox.classList.remove('hidden', 'high-risk', 'low-risk');

    if (score >= 3) {
        resultBox.classList.add('high-risk');
        riskLevel.innerText = "🚨 HIGH RISK: FAKE JOB / REGISTRATION SCAM";
        riskExplanation.innerText = "Warning! This exhibits all major signals of a widespread online typing job scam:";
    } else {
        resultBox.classList.add('low-risk');
        riskLevel.innerText = "⚠️ CAUTION REQUIRED";
        riskExplanation.innerText = "Be careful before sending any money or personal information:";
    }

    if (detectedFlags.length === 0) {
        detectedFlags.push("Do not pay any upfront registration fees for online job offers.");
    }

    detectedFlags.forEach(flag => {
        const li = document.createElement('li');
        li.innerText = flag;
        redFlagsList.appendChild(li);
    });
}