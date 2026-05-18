import { Group, Panel, Separator } from 'react-resizable-panels';
import { SandpackProvider, SandpackPreview, SandpackLayout } from '@codesandbox/sandpack-react';
import { cobalt2 } from '@codesandbox/sandpack-themes';
import Editor from './components/Editor/Editor';
import Sidebar from './components/Sidebar/Sidebar';
import { DEFAULT_CODE } from './utils/constants';

function App() {
  const initialFiles = {
    '/App.tsx': DEFAULT_CODE
  };

  return (
    <div className="flex h-screen w-full flex-col bg-[#09090b] text-white">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/20">
            ME
          </div>
          <h1 className="text-sm font-semibold tracking-tight text-zinc-100">
            My <span className="text-zinc-500 font-normal">Editor</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-700/50">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Live Preview
          </div>
          <button className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-700">
            Share
          </button>
          <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95">
            Download
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <SandpackProvider 
          template="react-ts" 
          theme={cobalt2}
          files={initialFiles}
          options={{
            activeFile: "/App.tsx",
            visibleFiles: ["/App.tsx", "/index.tsx"]
          }}
        >
          <div className="flex flex-1 w-full overflow-hidden">
            <Sidebar />
            <div className="flex-1 p-4 flex flex-col">
              <Group orientation="horizontal" className="flex-1">
                <Panel defaultSize={50} minSize={30}>
                  <Editor />
                </Panel>

                <Separator className="panel-resize-handle" />

                <Panel defaultSize={50} minSize={30}>
                  <div className="h-full w-full overflow-hidden rounded-lg border border-zinc-800 bg-white shadow-2xl flex flex-col">
                    <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2">
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Preview</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-zinc-300" />
                        <div className="h-2 w-2 rounded-full bg-zinc-300" />
                      </div>
                    </div>
                    <div className="flex-1 relative flex flex-col h-full">
                      <SandpackLayout style={{ height: '100%', flex: 1, border: 'none', borderRadius: 0 }}>
                        <SandpackPreview 
                          showNavigator={true}
                          showRefreshButton={true}
                          showOpenInCodeSandbox={false}
                          style={{ height: '100%' }}
                        />
                      </SandpackLayout>
                    </div>
                  </div>
                </Panel>
              </Group>
            </div>
          </div>
        </SandpackProvider>
      </main>

      {/* Footer */}
      <footer className="flex h-10 items-center justify-between border-t border-zinc-800 bg-zinc-900/50 px-6 text-[10px] font-medium text-zinc-500">
        <div className="flex gap-4">
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
        </div>
        <div className="flex gap-4 uppercase tracking-widest">
          <span>Sandpack Powered</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
