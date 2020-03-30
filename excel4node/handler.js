const xl = require('excel4node');
module.exports.server = async (event, context, callback) => {
  const fileName = 'Excel.xlsx'

  const wb = new xl.Workbook();
  const ws = wb.addWorksheet('Sheet 1');
  ws.cell(1, 1).string('Hello~!');

  const bufferData = await wb.writeToBuffer();

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