'use strict';
var xl = require('excel4node');
module.exports.server = async (event, context, callback) => {
  let fileName = 'Excel.xlsx'
  var wb = new xl.Workbook();
  var ws = wb.addWorksheet('Sheet 1');
  ws.cell(1, 1).string('Hello~!');
  // wb.write(fileName);

  let buffer = await wb.writeToBuffer();
  console.log(buffer)
  console.log(buffer.length)
  let response = {
    statusCode: 200,
    headers: {
      'Content-Length': buffer.length,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"; filename*=utf-8''${encodeURIComponent(fileName)};`,
    },
    body: buffer.toString('base64'),
    isBase64Encoded: true
  };
  return response;
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(buffer),
  // };
};
