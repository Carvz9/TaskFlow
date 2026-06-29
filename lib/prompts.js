export const PROMPTS = {
  academic: {
    title: "Academic Analysis",
    text: `
Analyze this image as an academic observer. Identify the visible objects, describe the educational or learning-related context, explain what activity may be happening, and give one constructive recommendation.

Respond ONLY with valid JSON in this exact shape:
{
  "objects": ["...", "..."],
  "context": "...",
  "activities": "...",
  "recommendations": "..."
}
`,
  },

  safety: {
    title: "Safety Analysis",
    text: `
Analyze this image as a safety inspector. Identify visible objects, describe the setting, explain any activity happening, and give one safety-related recommendation. If no hazard is visible, say that clearly in the recommendation.

Respond ONLY with valid JSON in this exact shape:
{
  "objects": ["...", "..."],
  "context": "...",
  "activities": "...",
  "recommendations": "..."
}
`,
  },

  inventory: {
    title: "Inventory Analysis",
    text: `
Analyze this image as an inventory clerk. Identify the visible physical items, describe the setting, explain what activity may be happening, and give one recommendation for organizing or recording the items.

Respond ONLY with valid JSON in this exact shape:
{
  "objects": ["...", "..."],
  "context": "...",
  "activities": "...",
  "recommendations": "..."
}
`,
  },
};