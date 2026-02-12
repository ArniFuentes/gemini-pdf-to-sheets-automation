function main() {
  try {
    console.log("Starting...");

    const promptText = `Extract the following data: in the file, look where it says "ASPECT TO BE CONTROLLED". 
      Below are texts that always begin with a capital letter followed by a ".", for example "A.". 
      So I want the key to be just the uppercase letter, and the value is "C", "NC" or "NA", depending
      if the checkbox is below "COMPLIANT", "NON-COMPLIANT" or "NOT APPLICABLE". 
      Respond with an array of JSON objects. Do not use Markdown.`;

    const docsInDriveFolder = getDocsInDriveFolder(folderId);
    const docsInSheets = getDocsInSheets(bookId, sheetName);

    docsInDriveFolder.forEach((doc) => {
      if (docsInSheets.includes(doc.name)) return
      const base64Data = getFileAsBase64(doc.id);
      const payload = buildGeminiPayload(base64Data, promptText);
      const apiResponse = retry(() => callGeminiAPI(payload, apiKey, model));
      const extractedData = extractGeminiData(apiResponse);
      const transformedData = extractedData.map((row) => [
        doc.name,
        Object.keys(row)[0],
        Object.values(row)[0],
      ]);

      loadToSheet(bookId, sheetName, transformedData);
    })

    console.log("Process completed");
  } catch (error) {
    MailApp.sendEmail({
      to: email,
      subject: "Error in the script",
      body: error.stack,
    });
    throw error;
  }
}
