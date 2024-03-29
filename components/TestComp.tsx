import axios from "axios";
import React, { useCallback, useState } from "react";

function TestComp() {
  const [inputData, setInputData] = useState("");
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);

  const sendData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/apiData", {
        inputData,
      });

      setResponseData(response.data.emails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [inputData]);

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-evenly gap-10">
        <div className="flex  justify-center gap-1">
          <input
            className="border border-neutral-500 px-4 rounded-md"
            onChange={(e) => setInputData(e.target.value)}
            value={inputData}
            type="text"
            placeholder="email"
          />
          <br />
          <button
            onClick={sendData}
            className="bg-red-500 p-4 rounded-md"
            type="submit"
          >
            Send
          </button>
        </div>
        {responseData && !loading && (
          <p className="flex items-center text-center">Data - {responseData}</p>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default TestComp;
