import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";

function TestComp() {
  const [startingUrls, setInputData] = useState("");
  const [responseData, setResponseData] = useState<
    { mainPageUrl: string; foundEmails: string[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("responseData:", responseData);
  }, [responseData]);

  const sendData = useCallback(async () => {
    if (!startingUrls.trim()) return; // Prevent sending empty URL
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/apiData",
        {
          startingUrls: startingUrls.trim().split("\n"), // Split multiple URLs by newline
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [startingUrls]);

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-evenly gap-10">
        <div className="flex flex-col items-center justify-center gap-1">
          <input
            className="border border-neutral-500 px-4 py-2 rounded-md"
            onChange={(e) => setInputData(e.target.value)}
            value={startingUrls}
            placeholder="Enter URLs (one per line)"
            required
          />
          <button
            onClick={sendData}
            className="bg-purple-300 p-4 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {!loading && responseData.length > 0 && (
          <div className="text-center">
            {responseData.map((websiteData, index) => (
              <div key={index}>
                <h2>Main Page URL: {websiteData.mainPageUrl}</h2>
                <ul>
                  {websiteData.foundEmails.map((email, emailIndex) => (
                    <li key={emailIndex}>{email}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default TestComp;
