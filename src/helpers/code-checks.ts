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
    let usedLiteral = false;

    walk(ast, {
        Literal(node: any) {
            if (node.value === endResult) {
                usedLiteral = true;
            }
        },
    });

    if (usedLiteral) return false;
    return endResult.trim() === output.trim();
};
