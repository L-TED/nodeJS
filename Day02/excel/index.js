const exceljs = require("exceljs");

const workbook = new exceljs.Workbook(); // workbook => 엑셀 전체
const peperoWorkbook = workbook.addWorksheet("빼빼로 리스트"); // 시트 생성
peperoWorkbook.columns = [
  // 시트 인풋
  { header: "이름", key: "name" },
  { header: "맛", key: "flavor" },
  { header: "칼로리", key: "kcal" },
];

peperoWorkbook.addRow({ name: "누드", flavor: "고소한 초코", kcal: "300" });
peperoWorkbook.addRow({ name: "오리지널", flavor: "초코", kcal: "250" });

workbook.xlsx.writeFile("pepero.xlsx");
