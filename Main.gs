function main() {
  try {
    console.log("Starting...");

    const docsInDriveFolder = getDocsInDriveFolder(folderId);
    const docsInSheets = getDocsInSheets(bookId, sheetName);

    docsInDriveFolder.forEach((doc) => {
      if (docsInSheets.includes(doc.name)) return;

      const base64Data = getFileAsBase64(doc.id);
      const payload = buildPayload(base64Data, promptText);
      const options = buildOptions(apiKey, payload);
      const response = retry(() => UrlFetchApp.fetch(url, options));
      const apiJson = response.getContentText();
      const geminiText = JSON.parse(apiJson).candidates[0].content.parts[0].text;
      const geminiTextAsObject = JSON.parse(geminiText);
      const arrayOfArrays = geminiTextAsObject.map((element) => [
        doc.name,
        Object.keys(element)[0],
        Object.values(element)[0],
      ]);

      loadToSheet(bookId, sheetName, arrayOfArrays);
    })

    console.log("Process completed");
  } catch (error) {
    // MailApp.sendEmail({
    //   to: email,
    //   subject: "Error in the script",
    //   body: error.stack,
    // });

    throw error;
  }
}
