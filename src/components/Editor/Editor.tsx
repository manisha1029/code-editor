import { Editor as MonacoEditor, type OnChange } from '@monaco-editor/react';
import { type FC } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  theme?: string;
}

const Editor: FC<EditorProps> = ({ value, onChange, language = 'javascript', theme = 'vs-dark' }) => {
  const handleEditorChange: OnChange = (value) => {                          
    onChange(value);
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-zinc-800 bg-[#1e1e1e] shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-4 text-xs font-medium text-zinc-400">index.tsx</span>
        </div>
      </div>
      <div className="h-[calc(100%-40px)]">
        <MonacoEditor
          height="100%"
          language={language}
          theme={theme}
          value={value}
          onChange={handleEditorChange}
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
