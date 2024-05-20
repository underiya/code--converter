const Result = ({ data }) => {
  return (
    <div id="result">
      <h1>Result</h1>
      <textarea value={data} id="converted-code">
        {data}
      </textarea>
    </div>
  );
};

export default Result;
