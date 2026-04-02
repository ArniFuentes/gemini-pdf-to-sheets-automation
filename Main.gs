function main() {
  try {
    console.log("Starting...");

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
