import React, { useState } from "react";

function InputData() {
  const [inputData, setInput] = useState("" as string);
  const [finalResponse, setFinalResponse] = useState("" as string);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/processData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputData }),
    });

    const data = await response.json();
    // console.log(data.processedData);
    setFinalResponse(data.processedData);

    setInput("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-evenly gap-10">
      {/* <form
        onSubmit={handleSubmit}
        className="flex  justify-center gap-1"
        action="get"
      > */}
      <div className="flex  justify-center gap-1">
        <input
          className="border border-neutral-500 px-4 rounded-md"
          onChange={(e) => setInput(e.target.value)}
          value={inputData}
          type="text"
          placeholder="Name"
        />
        <br />
        <button
          onClick={handleSubmit}
          className="bg-red-500 p-4 rounded-md"
          type="submit"
        >
          Send
        </button>
        {/* </form> */}
      </div>
      <p className="flex items-center text-center">{finalResponse}</p>
    </div>
  );
}

export default InputData;
