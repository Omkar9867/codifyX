import clientPromise from "@/lib/mongodb";
import { Problem } from "@/utils/types/problemTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        title,
        problemStatement,
        examples,
        constraints,
        starterCode,
        handlerFunction,
        order,
        starterFunctionName,
      }: Problem = req.body;

      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("problems");

      const result = await collection.insertOne({
        title,
        problemStatement,
        examples,
        constraints,
        starterCode,
        handlerFunction,
        order,
        starterFunctionName,
      });

      res.status(200).json({ message: "Problem submitted successfully", result });
    } catch (error) {
      console.error("Error submitting problem:", error);
      res.status(500).json({ error: "Failed to submit problem" });
    }
  }else{
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
