import React, { useState, useCallback } from "react";
import axios from "axios";
import XLSX from "xlsx";

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: { url: string; emails: string[] }[];
}

const isValidUrl = (url: string) => {
  // Your URL validation logic goes here
  return true; // Placeholder for demonstration
};

const ToggleBtn = () => {
  const [websites, setWebsites] = useState<string[]>([]);
  const [responseWebsites, setResponseWebsites] = useState<WebsiteData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (typeof data === "string" || data instanceof ArrayBuffer) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData: any[] = XLSX.utils.sheet_to_json(sheet);

          const extractedWebsites: string[] = [];

          parsedData.forEach((obj) => {
            for (const key in obj) {
              const value = obj[key];
              if (typeof value === "string" && isValidUrl(value)) {
                extractedWebsites.push(value);
              }
            }
          });

          setWebsites(extractedWebsites);
          sendData(extractedWebsites);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sendData = useCallback(async (extractedWebsites: string[]) => {
    if (!extractedWebsites.length) return;
    try {
      const response = await axios.post<{ websites: WebsiteData[] }>(
        "/api/apiData",
        {
          startingUrls: extractedWebsites,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response);

      setResponseWebsites(response.data.websites);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default ToggleBtn;
