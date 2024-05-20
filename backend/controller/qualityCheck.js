const { genAI } = require("./converter");

async function qualityCheck(inputCode) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `write summary of code quality assisment of the following code :\n\n${inputCode}  , percentage- wise evaluation of each parameter and detailed explaination of each parameter
  For example:
 input:
        let numbers = [10, 23, 12, 21];

        let even = [];
        for(let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0)
            even.push(numbers[i]);
        }
 
output:
        **code Quality Assessment**

        **Parameters:**

        * **Maintainability:** 70%
        * **Readability:** 80%
        * **Testability:** 90%
        * **Security:** 100%

        **Detailed Evaluation:**

        **Maintainability:**

        * The code is well-structured with a clear separation of concerns.
        * It uses descriptive variable names and follows naming conventions.
        * However, the lack of error handling reduces the maintainability score.

        **Readability:**

        * The code is well-formatted and uses indentation to improve readability.
        * It avoids complex logic or nested statements, making it easy to follow.

        **Testability:**

        * The code is well-suited for testing, as it has a clear input and output.
        * The use of loops and conditional statements makes it easy to set up test cases.

        **Security:**

        * The code does not perform any sensitive operations or handle user input, making it secure by default.

        **Overall:**

        * The code has good readability and testability, but needs improvement in maintainability by adding error handling mechanisms.
        * It maintains a high level of security by avoiding potential vulnerabilities
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}
module.exports = { qualityCheck };
