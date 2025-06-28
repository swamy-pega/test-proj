import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader() {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      const wsName = wb.SheetNames[0]; // Get first sheet
      const ws = wb.Sheets[wsName];

      const data = XLSX.utils.sheet_to_json(ws); // Convert to JSON
      setExcelData(data);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2 bbackgroundColor:white >Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      
      <h3>Data Preview:</h3>
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </div>
  );
}

export default ExcelReader;
