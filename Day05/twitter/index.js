const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const { feeds, comments } = require("./data");
const { v4 } = require("uuid");

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to X</h1>`);
});

// FEEDS

// create => id, author, content, createdAt
app.post("/feeds", (req, res) => {
  const { author, content, createdAt } = req.body;
  if (!author || !content || !createdAt) {
    res.status(404).json(`Please fill whole sections`);
    return;
  }

  feeds.push({ id: v4(), author, content, createdAt, comment: [] });
  res.json(`${author} just updated a feed!`);
});
// read
app.get("/feeds", (req, res) => {
  const { author, content, createdAt } = req.query;

  if (author) res.json(feeds.filter((v) => v.author == author));
  if (content) res.json(feeds.filter((v) => v.content == content));
  if (createdAt) res.json(feeds.filter((v) => v.createdAt == createdAt));

  res.json(feeds);
});
// update
app.put("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const readId = feeds.find((v) => v.id == feedId);
  if (!readId) {
    res.status(404).json(`An error occurred`);
    return;
  }

  const { author, content, createdAt } = req.body;
  readId.author = author || readId.author;
  readId.content = content || readId.content;
  readId.createdAt = createdAt || readId.createdAt;

  res.json({
    message: ` User ${readId.id}'s feed has successfully changed`,
    data: readId,
  });
});
// delete
app.delete("/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const readId = feeds.find((v) => v.id == feedId);
  if (!readId) {
    res.status(404).json(`An error occurred`);
    return;
  }

  feeds.splice(readId, 1);
  res.json({
    message: `Feed(${feedId}) has successfully deleted`,
    deletedData: readId,
  });
});

// COMMENTS

/* 
comments 생성
 -코멘트 -> 코멘트(ID: v4())
 -코멘트 -> "/feeds/:id/comments"
 - "/feeds/(아이디 입력)/comments/" -> 조회
*/

// create => id, feedId, author, content, createdAt
app.post("/feeds/:feedId/comments", (req, res) => {
  const { feedId } = req.params;
  const { author, content, createdAt } = req.body;
  if (!author || !content || !createdAt) {
    res.status(404).json(`Something went wrong`);
    return;
  }

  // feedId로 피드 찾기
  const feed = feeds.find((f) => f.id === feedId);
  if (!feed) {
    return res.status(404).json(`Feed not found`);
  }

  const feedComment = { commentId: v4(), author, content, createdAt };
  feed.comment.push(feedComment);
  res.json({ commenter: author, comment: content });
});
// read
app.get("/feeds/:feedId/comments", (req, res) => {
  const { author, content, createdAt } = req.query;

  if (author) res.json(comments.filter((v) => v.author == author));
  if (content) res.json(comments.filter((v) => v.content == content));
  if (createdAt) res.json(comments.filter((v) => v.createdAt == createdAt));

  res.json(comments);
});
// update
app.put("/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const readId = comments.find((v) => v.id == commentId);
  if (!readId) {
    res.status(404).json(`An error occurred`);
    return;
  }

  const { author, content, createdAt } = req.body;
  readId.author = author || readId.author;
  readId.content = content || readId.content;
  readId.createdAt = createdAt || readId.createdAt;

  res.json({
    message: ` User ${readId.id}'s comment has successfully changed`,
    data: readId,
  });
});
// delete
app.delete("/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const readId = comments.find((v) => v.id == commentId);
  if (!readId) {
    res.status(404).json(`An error occurred`);
    return;
  }

  comments.splice(readId, 1);
  res.json({
    message: `comment(${commentId}) has successfully deleted`,
    deletedData: readId,
  });
});

app.listen(port, () => {
  console.log("running");
});
