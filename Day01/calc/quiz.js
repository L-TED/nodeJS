const prompt = require("prompt-sync")();

// 숫자 두 개 받고 두 숫자의 합, 곱, 차 구하기

while (true) {
  try {
    const numA = prompt("첫 번째 숫자 입력");
    const numB = prompt("두 번째 숫자 입력");
    if (isNaN(numA) || isNaN(numB)) throw new Error("숫자가 아닙니다.");

    const a = +numA + +numB;
    const b = +numA - +numB;
    const c = +numA * +numB;
    const d = +numA / +numB;
    console.log(
      `두 수의 합: ${a}, 두 수의 차: ${b}, 두 수의 곱: ${c}, 두 수의 나눔: ${d}`
    );
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
  }
  const cont = prompt("wanna continue? [Y/N]");
  if (cont.toLowerCase() == "y") {
    continue;
  } else if (cont.toLowerCase() == "n") {
    break;
  }
}
