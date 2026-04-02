const props = PropertiesService.getScriptProperties();
const apiKey = props.getProperty("GEMINI_API_KEY");
const fileId = props.getProperty("FILE_ID");
const bookId = props.getProperty("BOOK_ID");
const folderId = props.getProperty("FOLDER_ID");
// const model = "gemini-3-flash-preview";
const model = "gemini-2.5-flash";
// const model = "gemini-2.5-flash-lite";
const sheetName = "data";
const email = props.getProperty("EMAIL");

const promptText = `Extract the following data: in the file, look where it says "ASPECT TO BE CONTROLLED". 
    Below are texts that always begin with a capital letter followed by a ".", for example "A.". 
    So I want the key to be just the uppercase letter, and the value is "C", "NC" or "NA", depending
    if the checkbox is below "COMPLIANT", "NON-COMPLIANT" or "NOT APPLICABLE". 
    Respond with an array of JSON objects. Do not use Markdown.`;
