const express = require("express");
const app = express();
const { ramen, reviews } = require("./data");
const { v4 } = require("uuid");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h1>라면</h1>`);
});

app.get("/ramens", (req, res) => {
  const { name, brand, soupType, spicyLevel } = req.query;
  if (name) {
    return res.json(ramen.filter((v) => v.name == name));
  }
  if (brand) {
    return res.json(ramen.filter((v) => v.brand == brand));
  }
  if (soupType) {
    return res.json(ramen.filter((v) => v.soupType == soupType));
  }
  if (spicyLevel) {
    return res.json(ramen.filter((v) => v.spicyLevel == +spicyLevel));
  }
  res.json(ramen);
});

app.get("/ramens/:id", (req, res) => {
  const { id } = req.params;
  res.json(ramen.find((v) => v.id == id));
});

app.post("/add", (req, res) => {
  const { name, brand, soupType, spicyLevel } = req.body;
  if (!name || !brand || !soupType || !spicyLevel) res.status(404).json("에러");
  else if (spicyLevel < 1 || 5 < spicyLevel) {
    return res.json(`유효하지 않은 레벨`);
  }

  if (ramen.find((v) => v.name == name)) {
    return res.status(404).json(`라면 이름이 중복됩니다.`);
  }

  ramen.push({ id: ramen.length, name, brand, soupType, spicyLevel });
  res.json(`신규 라면 ${name} 출시!`);
});

app.delete("/ramens/:id", (req, res) => {
  const { id } = req.params;

  const targetId = ramen.findIndex((v) => v.id == id);
  if (targetId == -1) {
    res.status(404).json(`잘못된 id 입니다.`);
    return;
  }

  ramen.splice(targetId, 1);
  // callback -> 변수 불변 원칙
  //   ramen.map((v, i) => ({ ...v, id: i }));
  res.json(`${id} 데이터 삭제`);
});

app.put("/ramens/:id", (req, res) => {
  const { id } = req.params;
  const targetId = ramen.findIndex((v) => v.id == id);
  if (targetId == -1) {
    res.status(404).json(`잘못된 id 입니다.`);
    return;
  }

  const { name, brand, spicyLevel } = req.body;
  ramen[targetId].name = name || ramen[targetId].name;
  ramen[targetId].brand = brand || ramen[targetId].brand;
  ramen[targetId].spicyLevel = spicyLevel || ramen[targetId].spicyLevel;

  res.json(`${id} 데이터 변경`);
});

app.get("/ramens/:id/reviews", (req, res) => {});
app.post("/reviews", (req, res) => {
  const { nickname, contents, id: ramenID } = req.body;
});

app.listen(3000, () => {
  console.log("now is running");
});
