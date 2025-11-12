const express = require("express");
const app = express();
const { students } = require("./data");

app.get("/", (req, res) => {
  res.send("점심도시락 메뉴");
  const test = students.map((v) => v.menu).console.log(test);
});

// 옵션 제공: 쿼리 스트링
// localhost:3000/list?shots=5&flavor=chocolate
app.get("/list", (req, res) => {
  const { name, menu } = req.query;
  if (name) {
    const result = students.filter((v) => v.name == name);
    res.json(result || `${name}은 데이터에 없습니다.`);
  }
  if (menu) {
    const result1 = students.filter((v) => v.menu.includes(menu));
    res.json(result1 || `해당 메뉴를 가진 사람은 데이터에 없습니다.`);
  }

  res.json(students);
});

// 1~4 중 없으면 에러 텍스트
app.get("/list/:numVal", (req, res) => {
  const { numVal } = req.params;
  if (numVal > 0 && 5 > numVal) {
    return res.json(students[+numVal - 1]);
  } else {
    return res.send("그런 도시락은 없음");
  }
});

app.listen(3000, () => {
  console.log("Lunch Box");
});
