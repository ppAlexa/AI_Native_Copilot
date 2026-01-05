const analyzeBtn = document.getElementById("analyzeBtn");
const imageInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");
const statusDiv = document.getElementById("status");

const summaryDiv = document.getElementById("summaryText");
const detailsDiv = document.getElementById("detailsText");
const toggleBtn = document.getElementById("toggleBtn");

analyzeBtn.addEventListener("click", async () => {

  summaryDiv.innerText = "";
  detailsDiv.innerText = "";
  detailsDiv.style.display = "none";
  toggleBtn.style.display = "none";

  statusDiv.innerText = "Understanding the product...";

  let extractedText = textInput.value.trim();

  if (imageInput.files.length > 0) {
    statusDiv.innerText = "Reading ingredients from the image...";
    try {
      const result = await Tesseract.recognize(imageInput.files[0], "eng");
      extractedText = result.data.text;
    } catch {
      statusDiv.innerText = "Could not read image text.";
      return;
    }
  }

  if (!extractedText) {
    statusDiv.innerText = "Please upload an image or paste ingredients.";
    return;
  }

  statusDiv.innerText = "Thinking about what matters...";

  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: extractedText })
  });

  const data = await response.json();
  statusDiv.innerText = "";

  const fullText = data.explanation || "";

  const parts = fullText.split("DETAILS:");

  if (parts.length === 2) {
    summaryDiv.innerText = parts[0].replace("SUMMARY:", "").trim();
    detailsDiv.innerText = parts[1].trim();
    toggleBtn.style.display = "inline-block";
  } else {
    summaryDiv.innerText = fullText;
  }
});

toggleBtn.onclick = () => {
  const hidden = detailsDiv.style.display === "none";
  detailsDiv.style.display = hidden ? "block" : "none";
  toggleBtn.innerText = hidden ? "Show less" : "Show more";
};
