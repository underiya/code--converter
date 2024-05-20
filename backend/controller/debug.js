const { genAI } = require("./converter");

async function debugCode(inputCode) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `debug the following code :\n\n${inputCode}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}
module.exports = { debugCode };
