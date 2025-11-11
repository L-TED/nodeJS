const excel = require("exceljs");
const express = require("express");
const application = express();

application.get("/", (req, res) => {
  res.send("빼빼로 월드");
});

application.get("/list", async (req, res) => {
  const workbook = new excel.Workbook();
  await workbook.xlsx.readFile("./test.xlsx");
  const sheet = workbook.worksheets[0];
  const sheetArr = [];

  sheet.eachRow({ includeEmpty: false }, (row, num) => {
    const name = row.getCell(1).value;
    const price = row.getCell(2).value;
    sheetArr.push({ name, price });
  });

  res.json(sheetArr);
});

application.listen(3000, () => {
  console.log("pepero");
});
