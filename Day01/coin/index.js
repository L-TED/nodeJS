// https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
// {
//   "bitcoin": {
//     "usd": 101951
//   }
// }
const ccxt = require("ccxt");

let current = 0;

const getCoin = async () => {
  const exchange = new ccxt.binance();
  const coin = await exchange.fetchTicker("BTC/USDT");
  console.log(`현재 비트코인 가격: ${coin.last} 달러`);
  if (coin.last > current) {
    console.log("up");
  } else {
    console.log("humm");
  }
  current = coin.last;
};
getCoin();
setInterval(() => {
  getCoin();
}, 3000);
