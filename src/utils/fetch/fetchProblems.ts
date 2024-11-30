import { Problem } from "../types/problemTypes";

export const getAllProblems = async (): Promise<Problem[]> => {
  try {
    // Make sure the API URL starts with "/api" for Next.js internal API routes
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/v1/get-problems`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch problems");
    }

    const data = await response.json(); // Expecting the response to be an array of Problem objects
    if (!data.result || !Array.isArray(data.result)) {
      throw new Error("Invalid response structure");
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return []; // Returning an empty array in case of an error
  }
};
