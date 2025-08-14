import { useRef, useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import "../styles/editor.less";
export const CodeEditor = () => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>(null);

    const setEditorRef = (
        editor: monaco.editor.IStandaloneCodeEditor,
        monacoInstance: typeof monaco
    ) => {
        editorRef.current = editor;
    };

    return (
        <div className="editor-container">
            <div className="editor">
                <Editor
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    onMount={setEditorRef}
                />
            </div>
        </div>
    );
};
