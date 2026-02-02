import XLSX from 'xlsx';
import path from 'path';

export function readExcel(fileName, sheetName) {
  // Pakai current working directory (root project) sebagai base path
  const filePath = path.resolve(process.cwd(), 'data', fileName);

  console.log('Reading Excel file from:', filePath);  // Debug path

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}
