import { v4 } from "uuid";
import { Faker, ko } from "@faker-js/faker";
import Excel from "exceljs";

const customFaker = new Faker({ locale: [ko] });
function getNum(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const makeFakers = () => {
  const id = v4();
  const name = customFaker.person.fullName();
  const age = getNum(0, 80);
  const purpose = ["tourism", "business", "other"];
  const departure = ["incheon", "gimpo", "busan", "jeju"];
  const destination = ["tokyo", "osaka", "fukuoka", "sapporo"];
  const periodOfStay = getNum(1, 90);
  return {
    id: id,
    name: name,
    age: age,
    purpose: purpose[getNum(0, 2)],
    departure: departure[getNum(0, 3)],
    destination: destination[getNum(0, 3)],
    periodOfStay: periodOfStay,
  };
};

const generateExcel = async () => {
  const workbook = new Excel.Workbook();
  const sheets = workbook.addWorksheet("students");

  sheets.columns = [
    { header: "Id", key: "id" },
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "Purpose", key: "purpose" },
    { header: "Departure", key: "departure" },
    { header: "Destination", key: "destination" },
    { header: "PeriodOfStay", key: "periodOfStay" },
  ];

  for (let i = 0; i < 1000000; i++) {
    sheets.addRow(makeFakers());
  }
  await workbook.csv.writeFile("tourists.csv");
};

generateExcel();
