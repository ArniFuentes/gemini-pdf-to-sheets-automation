# Gemini PDF to Sheets Automation

This project automates the extraction of structured data from PDF files using Gemini and Google Apps Script.


---

## Features

- Data extraction from PDFs using Gemini
- Automatic processing of multiple files in a Google Drive folder
- Detection of previously processed documents to avoid duplicates
- Data transformation to tabular format
- Automatic upload to Google Sheets
- Email notifications in case of failures

---

## Technology Stack

- Google Apps Script (JavaScript)
- Gemini API (gemini-3-flash-preview)
- Google Drive
- Google Sheets
- Google Mail

---

## Process Flow

1. The script retrieves a list of PDF files from a Google Drive folder
2. It queries Google Sheets to identify which documents have already been processed
3. It processes only the new files
4. It converts the PDF to Base64
5. It sends the file to Gemini along with the extraction prompt
6. It transforms the response into tabular format
7. It saves the results in Google Sheets
