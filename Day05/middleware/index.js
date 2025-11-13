const express = require("express");
const morgan = require("morgan");
const joi = require("joi");
const app = express();
const { members } = require("./data");
const { logger, timeChecker, response } = require("./func");

app.use(express());
app.use(express.urlencoded({ extended: true }));
// morgan -> 메서드, URL, 상태코드, 응답시간 돌려줌 (e.f. GET / 200 14.594 ms - 66, GET /test 200 15.742 ms - 71)
app.use(morgan("dev"));
// 미들웨어로 반복되는 코드를 함수처럼 묶어 사용
app.use(response);

const nyah = (req, res, next) => {
  console.log("메롱");
  next();
};

app.get("/", (req, res) => {
  res.success("메인 페이지");
});

const schema = joi.object({
  name: joi.string(),
  age: joi.number().integer().min(19),
  position: joi.string().valid("vocal", "rapper", "dancer"),
});

const checkBody = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.json({ msg: "에러" });
  next();
};

app.post("/members", checkBody, (req, res) => {
  const { name, age, position } = req.body;
  members.push({ name, age, position });
  if (!name || !age || !position) {
    res.status(404).json(`데이터가 유효하지 않습니다.`);
    return;
  }
  res.success("멤버가 추가 되었습니다.");
});

// read
app.get("/members", (req, res) => {
  res.success(members);
});

// update
app.put("/member", checkBody, (req, res) => {
  const { name, age, position } = req.body;
  //   members.push({ name, age, position });
  if (!name || !age || !position) {
    res.status(404).json(`데이터가 유효하지 않습니다.`);
    return;
  }

  const targetIndex = members.findIndex((v) => v.name == name);
  members[targetIndex].name = name || members[targetIndex].name;
  members[targetIndex].age = age || members[targetIndex].age;
  members[targetIndex].position = position || members[targetIndex].position;

  res.json(`멤버의 정보가 수정되었습니다.`);
});

app.get("/test", nyah, (req, res) => {
  res.success("테스트 1 페이지");
});

app.get("/testing", nyah, (req, res) => {
  res.success("테스트 2 페이지");
});

app.listen(3000, () => {
  console.log("서버 연결");
});
