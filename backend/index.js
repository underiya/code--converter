const express = require("express");
const cors = require("cors");
const { convertCode } = require("./controller/converter");
const { debugCode } = require("./controller/debug");
const { qualityCheck } = require("./controller/qualityCheck");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.post("/convert", async (req, res) => {
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
app.post("/debug", async (req, res) => {
  const { inputCode, targetLanguage } = req.body;

  try {
    let code = await debugCode(inputCode, targetLanguage);
    res.json({
      msg: "done",
      code,
    });
  } catch (error) {
    res.json({ msg: "Error" });
  }
});
app.post("/qualitycheck", async (req, res) => {
  const { inputCode, targetLanguage } = req.body;

  try {
    let code = await qualityCheck(inputCode, targetLanguage);
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
