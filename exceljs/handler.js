'use strict';
const excel = require('exceljs');
const Stream = require('stream')
const fs = require('fs');

const fileName = '/tmp/export.xlsx'
module.exports.server = async (event, context, callback) => {
  const workbook = new excel.stream.xlsx.WorkbookWriter({
    filename: fileName,
  })

  const sheet = workbook.addWorksheet('My Sheet');
  sheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'dob', width: 15, }
  ];

  sheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) }).commit();
  sheet.commit();
  await workbook.commit();

  const bufferData = fs.readFileSync(fileName);

  return {
    statusCode: 200,
    headers: {
      'Content-Length': bufferData.length,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"; filename*=utf-8''${encodeURIComponent(fileName)};`,
    },
    body: bufferData.toString('base64'),
    isBase64Encoded: true
  };
};
