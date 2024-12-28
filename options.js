
document.getElementById("save-settings").addEventListener("click", () => {
  const interval = parseInt(document.getElementById("update-interval").value, 10);
  if (interval > 0) {
    chrome.storage.local.set({ updateInterval: interval });
    alert("Settings saved!");
  } else {
    alert("Please enter a valid number.");
  }
});
