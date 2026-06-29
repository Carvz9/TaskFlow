import * as FileSystem from "expo-file-system/legacy";

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

export async function imageToBase64(uri) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return base64;
}

export async function analyzeImage(base64Image, prompt) {
  if (!GEMINI_KEY) {
    throw new Error("Missing Gemini API key. Check your .env file.");
  }

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
    }),
  });

  const rawText = await response.text();

  let json;

  try {
    json = JSON.parse(rawText);
  } catch (error) {
    console.log("Gemini raw response:", rawText);
    throw new Error("Gemini did not return valid JSON.");
  }

  if (!response.ok) {
    console.log("Gemini API error:", json);
    throw new Error(json?.error?.message || "Gemini request failed.");
  }

  return json;
}