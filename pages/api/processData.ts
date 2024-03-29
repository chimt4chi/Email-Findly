import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { inputData } = req.body;

  // Simulate asynchronous operation (e.g., fetching data from a database)
  const processedData = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed: ${inputData}`);
    }, 1000);
  });

  res.status(200).json({ processedData });
}
