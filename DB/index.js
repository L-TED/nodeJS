const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc000",
  database: "university",
  connectionLimit: 10,
});

app.get("/boards", async (req, res) => {
  const [data] = await pool.query("select * from boards");
  res.json(data);
});
app.get("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const [data] = await pool.query("select * from boards");
  res.json(data[id - 1]);
});

app.post("/boards", async (req, res) => {
  const { user_nickname, title, contents } = req.body;

  const sql = `insert into boards (user_nickname, title, contents) values (?, ?, ?)`;

  const [result] = await pool.execute(sql, [user_nickname, title, contents]);
  res.json({ msg: `${result.insertId} 작성 완료` });
});

app.put("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const { user_nickname, title, contents } = req.body;
  const sql = `update boards set user_nickname = ?, title = ?, contents = ? where id = ${id}`;
  const [result] = await pool.execute(sql, [user_nickname, title, contents]);
  res.json({ msg: `${result.insertId} 데이터 수정 완료` });
});

app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(`delete from boards where id = ${id}`);
  res.json({ msg: `데이터 삭제 완료` });
});

app.listen(3000, () => {
  console.log("실행 중 입니다.");
});
