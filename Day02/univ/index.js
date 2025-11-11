const Excel = require("exceljs");

const readData = async () => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile("./test.xlsx");
  const sheet = workbook.worksheets[0];

  const data = [];

  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    // row.values[0]은 undefined이므로 slice(1)
    const values = row.values.slice(1);
    const obj = {};

    // 열 이름을 A, B, C 형태로 매핑
    values.forEach((value, i) => {
      const colLetter = String.fromCharCode(65 + i); // 65 = 'A'
      obj[colLetter] = value;
    });

    data.push(obj);
  });

  console.log(data);
};

readData();
