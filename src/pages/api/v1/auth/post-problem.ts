import clientPromise from "@/lib/mongodb";
import { ProblemData } from "@/utils/types/problemTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        id,
        title,
        category,
        difficulty,
        order,
        likes,
        dislikes,
        link,
        videoId,
      }: ProblemData = req.body;
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("problemData");

      const result = collection.insertOne({
        id,
        title,
        category,
        difficulty,
        order,
        likes,
        dislikes,
        link,
        videoId,
      });
      res
        .status(200)
        .json({ message: "Problem inserted successfully", result });
    } catch (error) {
      console.error("Error inserting problem:", error);
      res.status(500).json({ error: "Failed to insert problem" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
