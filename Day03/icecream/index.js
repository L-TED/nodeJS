const express = require("express");
const app = express();
const { icecream } = require("./data");

// JSON 본문 파싱(해석) 가능하게 함
app.use(express.json());
// html form 에서 전송된 데이터를 서버에서 읽을 수 있도록 옵션 설정 true
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>베스킨라빈스</h1>");
});
app.get("/menu", (req, res) => {
  const { underKcal, flavor } = req.query;

  if (underKcal) {
    const result = icecream.filter((v) => v.kcal <= underKcal);
    res.json(result);
  }
  if (flavor) {
    const result1 = icecream.filter((v) => v.flavor.includes(flavor));
    res.json(result1);
  }

  res.json(icecream);
});
app.get("/menu/:id", (req, res) => {
  const { id } = req.params;
  if (id > 0 && id < 5) {
    return res.json(icecream[+id - 1]);
  } else {
    return res.send(`존재 하지 않는 섹션`);
  }
});

app.post("/add", (req, res) => {
  const { name, kcal, flavor1, flavor2 } = req.body;
  icecream.push({ name, kcal, flavor1, flavor2 });
  res.json(`${name} 아이스크림 추가`);
});

app.listen(3000, () => {
  console.log("Running");
});
