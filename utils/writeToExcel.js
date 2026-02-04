import XLSX from 'xlsx';
import fs from 'fs';

export function writeUserToExcel(user, file, header) {
  if (!file) throw new Error('Parameter "file" wajib diisi');
  if (!user || Object.keys(user).length === 0) throw new Error('Parameter "user" tidak boleh kosong');

  let workbook;
  let worksheet;

  // Load workbook kalau ada, buat baru kalau tidak
  if (fs.existsSync(file)) {
    workbook = XLSX.readFile(file);
    worksheet = workbook.Sheets['Sheet1'] || XLSX.utils.json_to_sheet([]);
  } else {
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  }

  // Ambil data existing
  const existingData = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: false });

  // Kalau header null → ambil dari keys user
  const headers = header && header.length ? header : Object.keys(user);

  // Buat row baru sesuai header
  const newRow = {};
  headers.forEach(h => {
    newRow[h] = user[h] || '';
  });

  // Tambahkan row baru
  existingData.push(newRow);

  // Tulis kembali ke sheet
  const newSheet = XLSX.utils.json_to_sheet(existingData, { header: headers });
  workbook.Sheets['Sheet1'] = newSheet;

  XLSX.writeFile(workbook, file);
}
