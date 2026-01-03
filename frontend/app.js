const analyzeBtn = document.getElementById("analyzeBtn");
const imageInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");
const statusDiv = document.getElementById("status");
const responseBox = document.getElementById("responseBox");

analyzeBtn.addEventListener("click", async () => {
  responseBox.innerText = "";
  statusDiv.innerText = "Understanding the product...";

  let extractedText = textInput.value.trim();

  // If image is uploaded, run OCR
  if (imageInput.files.length > 0) {
    const imageFile = imageInput.files[0];
    statusDiv.innerText = "Reading ingredients from the image...";

    try {
      const result = await Tesseract.recognize(imageFile, "eng");
      extractedText = result.data.text;
    } catch (err) {
      statusDiv.innerText = "Could not read image text.";
      return;
    }
  }

  if (!extractedText) {
    statusDiv.innerText = "Please upload an image or paste ingredients.";
    return;
  }

  statusDiv.innerText = "Thinking about what matters...";

  // Send to backend
  const response = await fetch("http://localhost:8000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: extractedText })
  });

  const data = await response.json();
  statusDiv.innerText = "";
  responseBox.innerText = data.explanation;
});
