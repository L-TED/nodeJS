// import { Faker, ko } from "@faker-js/faker";
// import Excel from "exceljs";

// const customFaker = new Faker({ locale: [ko] });
function getNum(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const makeFakers = () => {
//   const name = customFaker.person.fullName();
//   const phoneNum = customFaker.phone.number({ style: "international" });
//   const genders = getNum(0, 1) == 0 ? "male" : "female";
//   return {
//     name: name,
//     age: getNum(20, 40),
//     gender: genders,
//     phone: phoneNum,
//   };
// };

// const generateExcel = async () => {
//   const workbook = new Excel.Workbook();
//   const sheets = workbook.addWorksheet("students");

//   sheets.columns = [
//     { header: "Name", key: "name" },
//     { header: "Age", key: "age" },
//     { header: "Gender", key: "gender" },
//     { header: "Phone", key: "phone" },
//   ];

//   for (let i = 0; i < 100000; i++) {
//     sheets.addRow(makeFakers());
//   }
//   await workbook.csv.writeFile("students.csv");
// };

// generateExcel();

const getRanVal = () => {
  console.log(getNum(0, 3));
};

getRanVal();
