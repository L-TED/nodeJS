const prompt = require("prompt-sync")(); // node 라이브러리 구버전 문법

// 예외처리
// try {
//   const a = prompt("첫 번째 숫자 입력");
//   const b = prompt("두 번째 숫자 입력");
//   console.log(`a/b: ${a / b}`);
// } catch (e) {
//   console.log(e);
//   console.log("에러 발생");
// }

// try {
//   const a = "부대";
//   const b = "찌개";
//   console.log(`a + b: ${a + c}`);
// } catch (e) {
//   // try코드에 에러 발생 시 실행하는 코드
//   console.log(e); // 에러 내역
//   console.log("에러 발생");
// }
try {
  const test = prompt("숫자 입력");
  if (isNaN(test)) throw Error("숫자가 아닙니다.");
} catch (e) {
  // try코드에 에러(예외) 발생 시 실행하는 코드
  console.log(e); // 에러 내역
  console.log(e.name); // 에러 이름/종류
  console.log(e.message); // 에러 시 메세지
}
