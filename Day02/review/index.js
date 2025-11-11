import PromptSync from "prompt-sync";

const prompt = PromptSync();

while (true) {
  try {
    const today = new Date();
    const dday = new Date("2026-01-27");
    const getDDay = dday.getTime() - today.getTime();
    const diff = getDDay / (1000 * 60 * 60 * 24);

    console.log(`D-Day: ${diff}일`);

    prompt("아무키나 입력해 프로그램 종료");
  } catch (e) {
    console.log(e.name);
    console.log(e.message);
  }
}
