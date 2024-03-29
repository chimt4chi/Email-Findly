import React, { useState } from "react";

function InputData() {
  const [inputData, setInput] = useState("" as string);
  const [finalResponse, setFinalResponse] = useState("" as string);

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/processData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputData }),
    });

    const data = await response.json();
    setFinalResponse(data.processedData);
    console.log(data); // You can handle the response data here
  };

  return (
    <div className="h-screen ">
      <div className="flex  justify-center gap-2">
        <input
          className="border border-red-500 px-4"
          onChange={handleChange}
          value={inputData}
          type="text"
          placeholder="Name"
        />
        <br />
        <button
          className="bg-red-500 p-4 rounded-md"
          onClick={handleSubmit}
          type="submit"
        >
          Send
        </button>
        <p>{finalResponse}</p>
      </div>
    </div>
  );
}

export default InputData;
