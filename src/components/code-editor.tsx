import { useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/editor.less";
import { getRandomProblem } from "../problems";
import { checkIfSuccess } from "../helpers/code-checks";

export const CodeEditor = () => {
    const [problem, setProblem] = useState(getRandomProblem());
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState<string>(problem.startingCode ?? "");
    const [output, setOutput] = useState("");

    const loadNewProblem = () => {
        const newProblem = getRandomProblem();
        setTimeout(() => {
            setProblem(newProblem);
            setCode(newProblem.startingCode ?? "");
            setOutput("");
            setSuccess(false);
        }, 3000);
    };

    const runCode = (src: string) => {
        try {
            const logs: any[] = [];
            const customConsole = {
                log: (...args: any[]) => logs.push(args.join(" ")),
            };

            const result = new Function("console", src)(customConsole);
            const outputCode = logs.length ? logs.join("\n") : String(result);
            setOutput(outputCode);
            const isSuccess = checkIfSuccess(
                problem.endResult,
                src,
                outputCode
            );

            if (isSuccess) {
                setSuccess(true);
                loadNewProblem();
            }
        } catch (error: any) {
            setOutput("Error: " + error.message);
        }
    };

    return (
        <div className="editor-container">
            <div className="header">
                <h1>{problem.title}</h1>
                <p>{problem.description}</p>
                {success && <p>Done!</p>}
            </div>
            <div className="editor">
                <Editor
                    defaultLanguage="typescript"
                    value={code}
                    onChange={(value) => {
                        setCode(value ?? "");
                        runCode(value ?? "");
                    }}
                />
            </div>

            <div className="output-container">{output}</div>
        </div>
    );
};
