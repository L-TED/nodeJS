const excel = require("exceljs");
const express = require("express");
const application = express();

application.get("/", (req, res) => {
  res.send("빼빼로 월드");
});

const getPepero = async () => {
  const workbook = new excel.Workbook();
  await workbook.xlsx.readFile("./test.xlsx");
  const sheet = workbook.worksheets[0];
  const sheetArr = [];

  sheet.eachRow({ includeEmpty: false }, (row, num) => {
    const name = row.getCell(1).value;
    const price = row.getCell(2).value;

    if (!name || !price) return;
    sheetArr.push({ name, price });
  });

  return sheetArr;
};

application.get("/list", async (req, res) => {
  const data = await getPepero();

  res.json(data);
});

// 동적 라우팅, 파라미터
application.get("/list/:numVal", async (req, res) => {
  const { numVal } = req.params;
  const data = await getPepero();

  res.json(data[+numVal - 1]);
});

application.listen(3000, () => {
  console.log("pepero");
});
