import { Editor as MonacoEditor, type OnChange } from '@monaco-editor/react';
import { type FC } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';

const Editor: FC = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile, updateFile } = sandpack;

  const code = files[activeFile]?.code || '';
  
  const getLanguage = (path: string) => {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
    if (path.endsWith('.js') || path.endsWith('.jsx')) return 'javascript';
    if (path.endsWith('.css')) return 'css';
    if (path.endsWith('.html')) return 'html';
    if (path.endsWith('.json')) return 'json';
    return 'plaintext';
  };

  const handleEditorChange: OnChange = (value) => {                          
    if (value !== undefined) {
      updateFile(activeFile, value);
    }
  };

  const handleEditorWillMount = (monaco: any) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-zinc-800 bg-[#1e1e1e] shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-4 text-xs font-medium text-zinc-400">{activeFile.replace('/', '')}</span>
        </div>
      </div>
      <div className="h-[calc(100%-40px)]">
        <MonacoEditor
          height="100%"
          language={getLanguage(activeFile)}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          path={activeFile}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
