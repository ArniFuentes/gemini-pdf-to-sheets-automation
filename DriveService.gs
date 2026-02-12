function getFileAsBase64(fileId) {
  if (!fileId) throw new Error("Error in getFileAsBase64 function: missing argument");

  const file = DriveApp.getFileById(fileId);
  const blob = file.getBlob();
  return Utilities.base64Encode(blob.getBytes());
}

function getDocsInDriveFolder(folderId) {
  if (!folderId) throw new Error("Error in getDocument function: missing argument");

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const fileList = [];

  // Extract the files to an array
  while (files.hasNext()) {
    const file = files.next();
    fileList.push({
      name: file.getName(),
      date: file.getDateCreated(),
      id: file.getId()
    });
  }

  return fileList;
}
