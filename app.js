const submitBtn = document.getElementById("submitBtn");
const statusDiv = document.getElementById("status");
const input = document.getElementById("youtubeUrl");

// 🔴 REPLACE THIS later with your API Gateway endpoint
const API_ENDPOINT = "https://YOUR_API_ID.execute-api.REGION.amazonaws.com/submit";

submitBtn.addEventListener("click", async () => {
  const url = input.value.trim();

  if (!url) {
    statusDiv.textContent = "Please enter a YouTube URL.";
    return;
  }

  submitBtn.disabled = true;
  statusDiv.textContent = "Submitting…";

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    statusDiv.textContent = "✅ Link accepted. Download queued.";
    input.value = "";

  } catch (err) {
    statusDiv.textContent = "❌ Error: " + err.message;
  } finally {
    submitBtn.disabled = false;
  }
});
