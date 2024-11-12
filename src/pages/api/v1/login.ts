import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if ((req.method = "POST")) {
    try {
      const { email, password }: User = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      const client = await clientPromise;
      const db = client.db();
      const user = await db.collection("users").findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No User for the email exist" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      //Create JWT for app auth
      const token = jwt.sign(
        { userId: user._id, email: user.email, displayName: user.displayName },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
        },
        token, // Send the JWT token to the client (useful for maintaining user sessions)
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
