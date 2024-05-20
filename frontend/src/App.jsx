import { useCallback, useState } from "react";
import "./App.css";
import { Editor } from "@monaco-editor/react";
import Result from "./Result";
export const baseUrl =
  "http://localhost:5000" || "https://code-converter-6782.onrender.com";
function App() {
  const initialState = {
    inputCode: "",
    targetLanguage: "",
  };
  const [form, setForm] = useState(initialState);
  const [data, setData] = useState("");

  const fetchFunction = useCallback(
    (endpoint) => {
      fetch(baseUrl + endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          // setData(initialState);
          setData(data.code);
        });
      console.log("convert code");
    },
    [form, data]
  );

  const handleConvert = (e) => {
    e.preventDefault();

    fetchFunction("/convert");
  };
  // console.log(data);

  // console.log(data?.code?.slice(form.targetLanguage.length + 3, -3));

  const handleDebug = (e) => {
    e.preventDefault();

    fetchFunction("/debug");
  };
  const handleQualityCheck = (e) => {
    e.preventDefault();

    fetchFunction("/qualitycheck");
  };
  return (
    <div
      className="app-container"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div id="converter">
        <div>
          <select
            name="targetLanguage"
            id=""
            value={form.targetLanguage}
            onChange={(e) =>
              setForm({ ...form, targetLanguage: e.target.value })
            }
          >
            <option value=" ">select language</option>
            <option value="java">java</option>
            <option value="javascript">javascript</option>
            <option value="python">python</option>
            <option value="C++">C++</option>
          </select>

          <button onClick={handleConvert}>Convert</button>
          <button onClick={handleDebug}>Debug</button>
          <button onClick={handleQualityCheck}>Quality Check</button>
        </div>
        <Editor
          height="100vh"
          width="100vh"
          defaultLanguage="javascript"
          defaultValue="// Enter your code here"
          value={form.inputCode}
          onChange={(value) => setForm({ ...form, inputCode: value })}
          theme="vs-dark"
          options={{ automaticLayout: true, suggest: true }}
          style={{ marginBottom: "10px" }}
        />
      </div>
      <h1 style={{ color: "green" }}>{"=>"}</h1>
      <Result data={data} />
    </div>
  );
}

export default App;
