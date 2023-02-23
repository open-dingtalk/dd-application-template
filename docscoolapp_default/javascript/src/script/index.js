/*global DingdocsScript*/

function insertSheet() {
  const sheet = DingdocsScript.workbook.insertSheet();
  sheet.activate();
}

DingdocsScript.registerScript('insertSheet', insertSheet);

function setCellValue(address, value) {
  const sheet = DingdocsScript.workbook.getActiveSheet();
  const range = sheet.getRange(address);
  range.setValue(value);
}

DingdocsScript.registerScript('setCellValue', setCellValue);

function setBackground(sheetId, a1Notaion) {
  const sheet = DingdocsScript.workbook.getSheet(sheetId);
  const range = sheet?.getRange(a1Notaion);
  range?.setBackgroundColor('red');
}

DingdocsScript.registerScript('setBackground', setBackground);

export {};