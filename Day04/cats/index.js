const express = require("express");
const app = express();
const { cats } = require("./data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Cats Cafe");
});
app.get("/cats", (req, res) => {
  const { name, underAge, color } = req.query;

  if (name) {
    res.json(cats.filter((v) => v.name == name));
  }
  if (underAge) {
    res.json(cats.filter((v) => v.age <= underAge));
  }
  if (color) {
    res.json(cats.filter((v) => v.color.includes(color)));
  }
  res.json(cats);
});
app.get("/cats/:id", (req, res) => {
  const { id } = req.params;
  const result = cats.find((v) => v.id == id);
  res.json(result || "404");
});

app.post("/add", (req, res) => {
  const { name, age, color } = req.body;
  if (!name || !age || !color) res.status(404).json("오류");
  if (cats.find((v) => v.name === name)) {
    return res.json("이름이 중복됩니다.");
  }

  cats.push({ name, age, color });
  res.json(`new lovely cat name is ${name}, came to cafe!`);
});

app.delete("/cats", (req, res) => {
  const { id } = req.body;

  const targetIndex = cats.findIndex((v) => v.id == +id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `id: ${id} cat data doesn't exist` });
    return;
  }

  cats.splice(targetIndex, 1);
  // 첫 번째 밸류부터 두 번째 밸류만큼 지움(a.splice(2, 1) -> 배열값 2번부터 1개 삭제)
  res.json(id);
});

app.put("/cats/:id", (req, res) => {
  const { id } = req.params;

  const targetIndex = cats.findIndex((v) => v.id == +id);
  if (targetIndex == -1) {
    res.status(404).json({ msg: `id: ${id} cat data doesn't exist` });
    return;
  }

  const { name, age, color } = req.body;
  cats[targetIndex].name = name || cats[targetIndex].name;
  // (바꿀 값) || (기본 설정값) => 바꿀 값을 설정하지 않으면 기본 설정값을 돌려줌, 안하면 undefined 처리(사라짐)
  cats[targetIndex].age = age || cats[targetIndex].age;
  cats[targetIndex].color = color || cats[targetIndex].color;

  res.json({ msg: `id: ${id} cat data has changed` });
});

app.listen(3000, () => {
  console.log("now is running");
});
