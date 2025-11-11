const fs = require("fs"); // file-system
const prompt = require("prompt-sync")();

const name = prompt("이름은?");
const age = prompt("나이는?");

fs.writeFileSync("hello.txt", `이름: ${name} 나이: ${age}`, "utf-8");
