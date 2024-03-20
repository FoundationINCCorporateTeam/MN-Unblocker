async function unblockWebsite() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!urlInput) {
        resultDiv.innerText = "Please enter a website URL";
        return;
    }

    try {
        // Fetch data from your serverless function with the website URL as a query parameter
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(urlInput)}`);
        const html = await response.text();
        resultDiv.innerHTML = html;
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerText = "Failed to unblock the website. Please try again later.";
    }
}
