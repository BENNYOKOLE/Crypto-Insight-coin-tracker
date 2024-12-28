
const API_URL = "https://api.coingecko.com/api/v3";

chrome.alarms.create("fetchPrices", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "fetchPrices") {
    const prices = await fetchCryptoPrices();
    if (prices) {
      checkPriceAlerts(prices);
    }
  }
});

async function fetchCryptoPrices() {
  try {
    const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1`);
    const data = await response.json();
    chrome.storage.local.set({ prices: data });
    return data;
  } catch (error) {
    console.error("Error fetching cryptocurrency prices:", error);
    return null;
  }
}

function checkPriceAlerts(prices) {
  chrome.storage.local.get(["alerts"], (result) => {
    const alerts = result.alerts || [];
    alerts.forEach((alert) => {
      const coin = prices.find((p) => p.id === alert.id);
      if (coin && (coin.current_price >= alert.threshold || coin.current_price <= alert.threshold)) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon48.png",
          title: "Price Alert",
          message: `${coin.name} has reached your threshold of $${alert.threshold}. Current Price: $${coin.current_price}`,
        });
      }
    });
  });
}
