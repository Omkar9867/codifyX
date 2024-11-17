import Topbar from "@/components/TopBar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <>
      <Topbar problemsPage />
      <Workspace />
    </>
  );
};

export default ProblemPage;
