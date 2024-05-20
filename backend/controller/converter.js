const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function convertCode(inputCode, targetLanguage) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log(targetLanguage);
  const prompt = `Convert the following code to ${targetLanguage}:\n\n${inputCode}
  For example:
  input:
    targetLanguage:c++,
    inputCode:
    class Solution {
      public int subsetXORSum(int[] nums) {
        
          return dfs(nums, 0, 0);
  
      }
      public int dfs(int[] nums, int i, int Xor){
          if(i==nums.length)return Xor;
  
          int include=dfs(nums, i+1,Xor^nums[i]);
          int notInclude=dfs(nums, i+1, Xor);
  
          return include+notInclude;
      }
    };

  output:
  class Solution {
    public:
      int subsetXORSum(vector<int>& nums) {
        return dfs(nums, 0, 0);
      }
    
    private:
      int dfs(vector<int>& nums, int i, int Xor) {
        if (i == nums.size()) return Xor;
    
        int include = dfs(nums, i + 1, Xor ^ nums[i]);
        int notInclude = dfs(nums, i + 1, Xor);
    
        return include + notInclude;
      }
    };
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}

module.exports = { convertCode, genAI };
