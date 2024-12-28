
document.addEventListener("DOMContentLoaded", async () => {
  const cryptoList = document.getElementById("crypto-list");

  chrome.storage.local.get(["prices"], (result) => {
    const prices = result.prices || [];
    cryptoList.innerHTML = prices
      .map(
        (coin) =>
          `<li><span>${coin.name}</span><span>$${coin.current_price}</span></li>`
      )
      .join("");
  });
});
