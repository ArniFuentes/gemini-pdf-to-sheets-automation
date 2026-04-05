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
