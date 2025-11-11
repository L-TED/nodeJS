// diary_2025-11-10 오전 10:55:55.txt
// 프롬프트 -> 일기: ㅇㅇ
const fs = require("fs");
const prompt = require("prompt-sync")();

const theDiary = prompt("일기 내용 입력: ");

const n = new Date().toLocaleDateString().replaceAll(" ", "");

fs.writeFileSync(`diary_${n}.txt`, theDiary, "utf-8");
