import Topbar from "@/components/TopBar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { getAllProblems } from "@/utils/fetch/fetchProblems";
import { Problem } from "@/utils/types/problemTypes";
import React from "react";

type ProblemPageProps = {
  problem: Problem
};

const ProblemPage: React.FC<ProblemPageProps> = ({problem}) => {
  console.log(problem)
  return (
    <>
      <Topbar problemsPage />
      <Workspace />
    </>
  );
};

//fetch the problemsData
//ssg
//getStaticPaths it creates dynamic routes

export async function getStaticPaths() {
  try {
    const problems = await getAllProblems();
    const paths = problems.map((problem) => {
      params: {
        pid: problem.id;
      }
    });

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Cannot get Problems and Paths", error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
  try {
    const problems = await getAllProblems();
    const result = problems.map((problem) => {
      problem.id === params.pid;
    });
    if (!result) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        result,
      },
    };
  } catch (error) {
    console.error("Cannot get Problems and Props", error);
    return {
      notFound: true,
    };
  }
}
export default ProblemPage;
