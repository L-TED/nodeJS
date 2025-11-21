const express = require("express");
const app = express();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/students", async (req, res) => {
  const students = await prisma.students.findMany();
  res.json(students);
});

app.post("/student", async (req, res) => {
  const { id, password, name, email } = req.body;
  const newPW = await bcrypt.hash(password, 10);
  await prisma.students.create({
    data: {
      id: id,
      password: newPW,
      name: name,
      email: email,
    },
  });

  res.json(`${id} 생성 완료`);
});

/* 
test id/ pw

oh123 abc1
kim123 abc2
lee123 abc3
*/
app.post("/pwCheck", async (req, res) => {
  // login 원리
  const { id, password } = req.body;

  const { password: prePW } = await prisma.students.findUnique({
    where: { id: id },
  });
  const checkResult = await bcrypt.compare(password, prePW);

  if (!checkResult) {
    res.json({ msg: "아이디 또는 비밀번호 불일치" });
    return;
  }

  const uuid = crypto.randomUUID();
  const start = new Date();
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);

  await prisma.session.create({
    data: {
      id: uuid,
      start: start.toTimeString().split(" ")[0],
      end: end.toTimeString().split(" ")[0],
    },
  });

  res.cookie("sessionID", uuid, {
    // 쿠키 생성
    httpOnly: true, // 브라우저에서 접근 못하게 함
    maxAge: 1000 * 60 * 1, // 쿠키 유효 시간 1분
    secure: false, // http 허용
  });

  res.json({ msg: "로그인 완료" });
});

app.listen(3000, () => {
  console.log("서버 연결");
});
