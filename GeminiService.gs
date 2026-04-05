function buildPayload(base64Data, promptText) {
  if (!base64Data || !promptText) throw new Error("Error in buildGeminiPayload function: missing argument(s)");

  const payload = {
    contents: [
      {
        parts: [
          { text: promptText },
          {
            inline_data: {
              mime_type: "application/pdf",
              data: base64Data,
            },
          },
        ],
      },
    ],
  };
  
  return payload
}

function buildOptions(apiKey, payload) {
  const options = {
    method: "POST",
    contentType: "application/json",
    headers: { "x-goog-api-key": apiKey },
    payload: JSON.stringify(payload),
    // muteHttpExceptions: true
  };

  return options;
}

// function callGeminiAPI(payload, apiKey, url) {
//   if (!payload || !apiKey || !url) throw new Error("Error in callGeminiAPI function: missing argument(s)");

  // const options = {
  //   method: "POST",
  //   contentType: "application/json",
  //   headers: { "x-goog-api-key": apiKey },
  //   payload: JSON.stringify(payload),
  //   muteHttpExceptions: true
  // };

  // const response = UrlFetchApp.fetch(url, options);
  // const json = response.getContentText();
  // const statusCode = response.getResponseCode();

  // if (statusCode !== 200) {
  //   const errorMessage = JSON.parse(json).error.message;
  //   throw new Error(`${errorMessage}`);
  // }
  
  // return JSON.parse(json);
// }

// function extractGeminiTextData(apiResponse) {
//   if (!apiResponse) throw new Error("Error in extractGeminiData function: missing argument");

//   const geminiText = apiResponse.candidates[0].content.parts[0].text;

  // Any content in the API response will always be interpreted as a 
  // string after the first parse, so a second parse is required to obtain the object.
  // return JSON.parse(geminiText);
// }
