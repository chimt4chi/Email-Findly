import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { inputData } = req.body;

    const emails = ["abc@gmail.com", "def@gmail.com", "ghi@gmail.com"];

    console.log("Input Data:", inputData);

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        inputData,
        emails,
      }
    );

    console.log("Response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
