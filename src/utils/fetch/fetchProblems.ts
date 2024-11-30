import { Problem } from "../types/problemTypes";

export const getAllProblems = async (): Promise<Problem[]> => {
  try {
    const response = await fetch("api/v1/get-problems", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch problems");
    }
    const data: Problem[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return [];
  }
};
