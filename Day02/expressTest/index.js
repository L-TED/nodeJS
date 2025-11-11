const express = require("express");
const app = express();
const fs = require("fs");
// app.get("/", (req, res) => {
//   res.send("Hi");
// });

// app.get("/happy", (req, res) => {
//   res.send("Happy!");
// });

// app.get("/ping", (req, res) => {
//   res.send("Pong!");
// });

const text = fs.readFileSync("./bake.txt", "utf-8");

// app.get("/arombake", (req, res) => {
//   res.json({ name: "아롬베이크", type: "빵짐", rate: 4.7 });
// });

app.get("/bake", (req, res) => {
  const arr = [];
  text.split("\n").forEach((v) => {
    const obj = {};
    v.split(",").forEach((e) => {
      const [key, value] = e.split(":");
      obj[key] = value;
    });
    arr.push(obj);
  });

  res.json(arr);
});

app.listen(3000, () => {
  console.log("실행");
});
