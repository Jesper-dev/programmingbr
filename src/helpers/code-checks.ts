import * as acorn from "acorn";
import { simple as walk } from "acorn-walk";

export const checkIfSuccess = (
    endResult: string,
    code: string,
    output: string
) => {
    const ast = acorn.parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
    });

    let usedLiteralInConsoleLog = false;
    const resultParts = endResult.split(",").map((x) => x.trim());

    walk(ast, {
        CallExpression(node: any) {
            if (
                node.callee.type === "MemberExpression" &&
                node.callee.object.name === "console" &&
                node.callee.property.name === "log"
            ) {
                for (const arg of node.arguments) {
                    if (arg.type === "Literal") {
                        if (
                            String(arg.value) === endResult ||
                            resultParts.includes(String(arg.value))
                        ) {
                            usedLiteralInConsoleLog = true;
                        }
                    }

                    if (arg.type === "ArrayExpression") {
                        const values = arg.elements.map((el: any) =>
                            el && el.type === "Literal"
                                ? String(el.value)
                                : null
                        );
                        if (values.every((v: any) => v !== null)) {
                            if (values.join(",") === endResult) {
                                usedLiteralInConsoleLog = true;
                            }
                        }
                    }

                    if (arg.type === "TemplateLiteral") {
                        const raw = arg.quasis
                            .map((q: any) => q.value.raw)
                            .join("");
                        if (raw.includes(endResult)) {
                            usedLiteralInConsoleLog = true;
                        }
                    }
                }
            }
        },
    });

    if (usedLiteralInConsoleLog) return false;
    return endResult.trim() === output.trim();
};
