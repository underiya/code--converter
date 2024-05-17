const express = require("express");
const cors = require("cors");
const { convertCode } = require("./controller/converter");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.post("/", async (req, res) => {
  const { inputCode, targetLanguage } = req.body;
  try {
    let code = await convertCode(inputCode, targetLanguage);
    res.json({
      msg: "done",
      code,
    });
  } catch (error) {
    res.json({ msg: "Error" });
  }
});
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
