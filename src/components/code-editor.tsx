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
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const restartGame = () => {
        setTimeLeft(120);
        setScore(0);
        loadNewProblem();
    };

    const loadNewProblem = (forceNewProblem?: boolean) => {
        const newProblem = getRandomProblem();
        if (forceNewProblem) {
            setProblem(newProblem);
            setCode(newProblem.startingCode ?? "");
            setOutput("");
            return;
        }
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
                setScore(score + 10);
                loadNewProblem();
            }
        } catch (error: any) {
            setOutput("Error: " + error.message);
        }
    };

    const renderContent = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        if (timeLeft <= 0) {
            return (
                <div className="times-up-container">
                    <h1>Times up!</h1>
                    <p>Final score: {score}</p>
                    <button onClick={restartGame}>Play again</button>
                </div>
            );
        }

        return (
            <>
                <div className="header">
                    <div className="time-points-container">
                        <p>Time left: {formattedTime}</p>
                        <p>Score: {score}</p>
                    </div>
                    <h1 className="problem-title">{problem.title}</h1>
                    <p>{problem.description}</p>
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
