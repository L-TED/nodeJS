const exceljs = require("exceljs");

const readExcel = async () => {
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.readFile("data.xlsx");
  const sheet = workbook.worksheets[0];

  let row = 13;
  while (true) {
    const newRow = sheet.getRow(row);
    console.log(newRow.values[3].richText[1].text);
    row = row + 10;
    if (row > 154) break;
  }
};

readExcel();
