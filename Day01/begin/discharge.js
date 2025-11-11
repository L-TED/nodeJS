// import PromptSync from "prompt-sync"; // node 라이브러리 신버전 문법
// const prompt = PromptSync();

const prompt = require("prompt-sync")(); // node 라이브러리 구버전 문법

// 오늘 기점 d-day 계산기

while (true) {
  try {
    const year = prompt("년 입력:");
    const month = prompt("월 입력:");
    const day = prompt("일 입력:");
    if (isNaN(year) || isNaN(month) || isNaN(day))
      throw new Error("날짜 입력 오류");

    const today = new Date();
    const dDay = new Date(`${year}-${month}-${day}`);

    const diff = dDay.getTime() - today.getTime();
    const diffDay = diff / (1000 * 60 * 60 * 24);

    console.log(`D-Day: ${diffDay}`);
  } catch (e) {
    console.log(e.message);
  }

  const restart = prompt("wanna restart?[Y/N]");
  if (restart.toLowerCase() == "n") break;
}
