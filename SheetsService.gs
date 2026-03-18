function loadToSheet(bookId, sheetName, data) {
  if (!bookId || !sheetName || !data) throw new Error("Error in loadToSheet function: missing argument(s)");
  const sheet = setSheet(bookId, sheetName);
  const row = sheet.getLastRow() + 1;
  const column = 1;
  const numRows = data.length;
  const numColumns = data[0].length;
  const range = sheet.getRange(row, column, numRows, numColumns);
  range.setValues(data);
}

function getDocsInSheets(bookId, sheetName) {
  if (!bookId || !sheetName) throw new Error("Error in getDocsInSheets function: missing argument(s)");
  const sheet = setSheet(bookId, sheetName);
  const row = 2;
  const column = 1;
  const lastRow = sheet.getLastRow();
  const numRows = lastRow === 1 ? lastRow : lastRow - 1;
  const numColumns = 1;
  const range = sheet.getRange(row, column, numRows, numColumns);
  const listDocumentNames = range.getValues();
  const listWithNoDuplicates = [...new Set(listDocumentNames.flat())];
  return listWithNoDuplicates;
}

function setSheet(bookId, sheetName) {
  const book = SpreadsheetApp.openById(bookId);
  const sheet = book.getSheetByName(sheetName);
  return sheet;
}
