import { ObjectId } from "mongodb";

export type Example = {
    id: number;
    inputText: string;
    outputText: string;
    explanation?: string;
    img?: string;
  };
  
  export type Problem = {
    _id?: string | ObjectId;
    title: string;
    problemStatement: string;
    examples: Example[];
    constraints: string;
    order: number;
    starterCode: string;
    handlerFunction: string;
    starterFunctionName: string;
  };
  