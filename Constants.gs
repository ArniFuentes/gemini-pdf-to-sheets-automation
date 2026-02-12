const props = PropertiesService.getScriptProperties();
const apiKey = props.getProperty("GEMINI_API_KEY");
const fileId = props.getProperty("FILE_ID");
const bookId = props.getProperty("BOOK_ID");
const folderId = props.getProperty("FOLDER_ID");
const model = "gemini-3-flash-preview";
const sheetName = "data";
const email = props.getProperty("EMAIL");
