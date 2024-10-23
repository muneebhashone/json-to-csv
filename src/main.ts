import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { Common } from './types';

const readJson = (jsonPath: string) => {
  const file = fs.readFileSync(path.join(process.cwd(), jsonPath), 'utf8');
  return JSON.parse(file);
};

const mapCommonJson = (commonJson: Common) => {

  const sheets: Record<string, Record<string, string> | Record<string, string>[]> = {
    common: {},
  }

  const common = sheets.common as Record<string, string>;

  Object.entries(commonJson).forEach(([key, value]) => {
    if (typeof value !== 'object') {
      common[key] = value as string;
      return;
    }

    for (const [nestedKey, nestedValue] of Object.entries(value)) {

      if (typeof nestedValue === 'object') {

        if (nestedValue === null) {
          return;
        }

        if (Array.isArray(nestedValue)) {

          sheets[`${key}.${nestedKey}`] = nestedValue;

          return;
        }

        for (const [nestedNestedKey, nestedNestedValue] of Object.entries(nestedValue)) {
          common[key + '.' + nestedKey + '.' + nestedNestedKey] = nestedNestedValue as string;
        }
      } else {
        common[key + '.' + nestedKey] = nestedValue as string;
      }
    }

  });

  return sheets;
};

function createMultiSheetCSV() {
  // Create workbook
  const workbook = XLSX.utils.book_new();

  const workbookName = 'roman-urdu.xlsx';

  const commonJson = readJson('common.json') as Common;

  const mappedCommonJson = mapCommonJson(commonJson);

  console.log(JSON.stringify(mappedCommonJson, null, 2));

  // Dummy data for first sheet (Employees)

  for (const [sheetName, sheetData] of Object.entries(mappedCommonJson)) {

    let sheet: XLSX.WorkSheet;

    if (Array.isArray(sheetData)) {
      sheet = XLSX.utils.json_to_sheet(sheetData);
    } else {
      sheet = XLSX.utils.json_to_sheet([sheetData]);
    }

    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
  }

  // const employeesData = [
  //   { id: 1, name: 'John Doe', role: 'Developer', salary: 75000 },
  //   { id: 2, name: 'Jane Smith', role: 'Designer', salary: 70000 },
  //   { id: 3, name: 'Bob Johnson', role: 'Manager', salary: 85000 },
  // ];

  // // Dummy data for second sheet (Products)
  // const productsData = [
  //   { id: 1, name: 'Laptop', price: 999, stock: 50 },
  //   { id: 2, name: 'Mouse', price: 29.99, stock: 100 },
  //   { id: 3, name: 'Keyboard', price: 59.99, stock: 75 },
  // ];

  // // Convert data to worksheets
  // const employeesSheet = XLSX.utils.json_to_sheet(employeesData);
  // const productsSheet = XLSX.utils.json_to_sheet(productsData);

  // // Add worksheets to workbook
  // XLSX.utils.book_append_sheet(workbook, employeesSheet, 'Employees');
  // XLSX.utils.book_append_sheet(workbook, productsSheet, 'Products');

  // Write to file
  XLSX.writeFile(workbook, workbookName);

  // Write separate CSV files
  // XLSX.writeFile(workbook, 'employees.csv', { bookType: 'csv', sheet: 'Employees' });
  // XLSX.writeFile(workbook, 'products.csv', { bookType: 'csv', sheet: 'Products' });
  console.log('Excel file created successfully!');
}

function main() {
  createMultiSheetCSV();
}

main();
