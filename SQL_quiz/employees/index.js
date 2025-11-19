// /*
// 회사 직원
// */
// const { Faker, ko } = require("@faker-js/faker");
// const Excel = require("exceljs");
// const Chance = require("chance");
// const chance = new Chance();

// const customFaker = new Faker({ locale: [ko] });
// function getNum(min, max) {
//   min = Math.ceil(min); // Ensure min is an integer
//   max = Math.floor(max); // Ensure max is an integer
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const makeFakers = () => {
//   const name = customFaker.person.fullName();
//   const gender = chance.weighted(["male", "female"], [60, 40]);
//   const salary = getNum(3000, 30000);
//   const departments = chance.weighted(
//     ["marketing", "IT", "advertising", "design", "finance"],
//     [50, 10, 20, 10, 10]
//   );
//   const position = chance.weighted(
//     ["intern", "assistant", "manager", "header"],
//     [10, 50, 30, 10]
//   );
//   return { name, gender, salary, departments, position };
// };

// const generateExcel = async () => {
//   const workbook = new Excel.Workbook();
//   const sheets = workbook.addWorksheet("employees");

//   sheets.columns = [
//     { header: "Name", key: "name" },
//     { header: "Gender", key: "gender" },
//     { header: "Salary", key: "salary" },
//     { header: "Departments", key: "departments" },
//     { header: "Position", key: "position" },
//   ];

//   for (let i = 0; i < 100000; i++) {
//     sheets.addRow(makeFakers());
//   }
//   await workbook.csv.writeFile("employees.csv");
// };

// generateExcel();
// 2
/* 
대학생
*/
const { Faker, ko } = require("@faker-js/faker");
const Excel = require("exceljs");
const Chance = require("chance");
const chance = new Chance();

const customFaker = new Faker({ locale: [ko] });
function getNum(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const makeFakers = () => {
  const name = customFaker.person.fullName();
  const grade = chance.weighted(
    ["1", "2", "3", "4", "5", "6"],
    [30, 30, 20, 10, 5, 5]
  );
  const departmentId = chance.weighted(
    ["marketing", "IT", "advertising", "design", "finance"],
    [50, 10, 20, 10, 10]
  );
  const position = chance.weighted(
    ["intern", "assistant", "manager", "header"],
    [10, 50, 30, 10]
  );
  return { name, gender, salary, departments, position };
};

const generateExcel = async () => {
  const workbook = new Excel.Workbook();
  const sheets = workbook.addWorksheet("employees");

  sheets.columns = [
    { header: "Name", key: "name" },
    { header: "Gender", key: "gender" },
    { header: "Salary", key: "salary" },
    { header: "Departments", key: "departments" },
    { header: "Position", key: "position" },
  ];

  for (let i = 0; i < 100000; i++) {
    sheets.addRow(makeFakers());
  }
  await workbook.csv.writeFile("employees.csv");
};

generateExcel();
