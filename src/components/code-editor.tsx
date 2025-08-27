import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/editor.less";
import { getRandomProblem } from "../problems";
import { checkIfSuccess } from "../helpers/code-checks";

export const CodeEditor = () => {
    const [problem, setProblem] = useState(getRandomProblem());
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState<string>(problem.startingCode ?? "");
    const [output, setOutput] = useState("");
    const [problemsSolved, setProblemsSolved] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const loadNewProblem = (forceNewProblem?: boolean) => {
        const newProblem = getRandomProblem();
        if (forceNewProblem) {
            setProblem(newProblem);
            setCode(newProblem.startingCode ?? "");
            setOutput("");
            return;
        }
        setProblemsSolved(problemsSolved + 1);
        setProblem(newProblem);
        setCode(newProblem.startingCode ?? "");
        setOutput("");
        setSuccess(false);
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

    const renderContent = () => {
        if (timeLeft <= 0) {
            return <p>You have lost!</p>;
        }
        if (problemsSolved === 10) {
            return (
                <div>
                    <h2>{`Problems solved: ${problemsSolved}/10`}</h2>
                    <p>You have solved all the problems!</p>
                </div>
            );
        }
        return (
            <>
                <div className="header">
                    <p>Time left: {timeLeft}</p>
                    <h1>{problem.title}</h1>
                    <p>{problem.description}</p>
                    <h2>{`Problems solved: ${problemsSolved}/10`}</h2>
                    {success && <p>Done!</p>}
                </div>
                <div className="editor-container">
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
                    <button onClick={() => loadNewProblem(true)}>
                        NEW PROBLEM
                    </button>
                    <div className="output-container">{output}</div>
                </div>
            </>
        );
    };

    return <div className="page-container">{renderContent()}</div>;
};
