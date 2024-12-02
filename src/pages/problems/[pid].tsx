import Topbar from "@/components/TopBar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { getAllProblems } from "@/utils/fetch/fetchProblems";
import { Problem } from "@/utils/types/problemTypes";
import React from "react";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  console.log(problem);
  return (
    <>
      <Topbar problemsPage />
      <Workspace problem={problem} />
    </>
  );
};

//fetch the problemsData
//Static Site Generation (SSG) process
//getStaticPaths it creates dynamic routes

export async function getStaticPaths() {
  try {
    const problems = await getAllProblems();
    const paths = problems.map((problem) => ({
      params: { pid: problem.id }, // Map problem IDs for dynamic routes
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error("Cannot get Problems and Paths", error);
    return { paths: [], fallback: false };
  }
}


export async function getStaticProps({ params }: { params: { pid: string } }) { //it will fetch the specific data associated with that route
  try {
    const problems = await getAllProblems();
    const result = problems.find((problem) => problem.id === params.pid);

    if (!result) {
      return { notFound: true };
    }

    // if (result.handlerFunction) {
    //   try {
    //     const handlerModule = handlerFn[result.handlerFunction as keyof typeof handlerFn];

    //     // Dynamically access the function by name
    //     // const handlerFn = handlerModule[result.handlerFunction];

    //     // if (typeof handlerFn !== 'function') {
    //     //   throw new Error(`Handler function '${result.handlerFunction}' is not a function.`);
    //     // }

    //     // result.handlerFunction = handlerModule; 
    //   } catch (error) {
    //     console.error(`Failed to load handler function: ${result.handlerFunction}`, error);
    //     return { notFound: true };
    //   }
    // }

    return {
      props: { problem: result },
    };
  } catch (error) {
    console.error("Cannot get Problems and Props", error);
    return { notFound: true };
  }
}

export default ProblemPage;
