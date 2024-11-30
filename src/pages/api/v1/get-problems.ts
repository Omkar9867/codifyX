import clientPromise from "@/lib/mongodb";
import { NextApiResponse, NextApiRequest } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("problems");

      const result = await collection.find({}).toArray();
      res.status(200).json({ message: "Problem find successfully", result });
    } catch (error) {
      console.error("Error fetching problem:", error);
      res.status(500).json({ error: "Failed to fetch problems" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
