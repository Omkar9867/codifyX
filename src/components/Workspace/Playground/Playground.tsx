import React from "react";
import PreferanceNav from "./PreferanceNav/PreferanceNav";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

type PlaygroundProps = {};

const Playground: React.FC<PlaygroundProps> = () => {
  return (
    <>
      <div className="flex flex-col bg-dark-layer-1 relative">
        <PreferanceNav />

        <Split
          className='h-[calc(100vh-94px)]'
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="w-full overflow-auto">
            <ReactCodeMirror
              value="const a = 1"
              theme={vscodeDark}
              extensions={[javascript()]}
              style={{ fontSize: 16 }}
            />
          </div>
          <div>Test Cases</div>
        </Split>
      </div>
    </>
  );
};

export default Playground;
