const ccxt = require("cctx");

let currentCoin = 0;

const exchange = new ccxt.binance();
const coin = exchange.fetchTicker("BTC/USDT");

while (true) {
  try {
    let buy = +prompt("구매할 금액 입력(10 만원 ~ 100 만원)");
    if (isNaN(buy)) throw new Error("숫자만 입력 가능합니다");
    return buy;
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
  }
  const doubleCheck = prompt("구매를 원할 시, 엔터를 누르십시오");
  if (doubleCheck == "") break;
}

setTimeout(() => {
  console.log(`이익&손실 = ${coin.last / buy}`);
}, 30000);
