import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

interface User {
  email: string;
  displayName: string;
  password: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, displayName, password }: User = req.body;
      //Db Start
      const client = await clientPromise;
      const db = client.db();
      //Existing User check
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }
      //Hash Password
      const hashPassword = await bcrypt.hash(password, 10);
      //Create New User
      const newUser = {
        email,
        displayName,
        password: hashPassword,
        createAt: new Date(),
      };
      //Insert into DB
      const result = await db.collection("users").insertOne(newUser);
      res.status(201).json({
        message: "User created Successfully",
        user: {
          id: result.insertedId,
          email,
          displayName,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
