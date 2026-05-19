import { type FC, useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import { File, FilePlus, Package, Plus, Trash2 } from 'lucide-react';

const Sidebar: FC = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile, updateFile, deleteFile, addFile } = sandpack;
  
  const [newFileName, setNewFileName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newDepName, setNewDepName] = useState('');
  const [isAddingDep, setIsAddingDep] = useState(false);

  const fileList = Object.keys(files).filter(path => !path.startsWith('/node_modules') && path !== '/package.json');
  
  let packageJson: { dependencies: Record<string, string> } = { dependencies: {} };
  try {
    packageJson = files['/package.json'] ? JSON.parse(files['/package.json'].code) : { dependencies: {} };
  } catch (e) {
    // ignore parse errors
  }
  const dependencies: Record<string, string> = packageJson.dependencies || {};

  const handleCreateFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newFileName) {
      let path = newFileName.startsWith('/') ? newFileName : `/${newFileName}`;
      addFile(path, '');
      setNewFileName('');
      setIsCreatingFile(false);
    } else if (e.key === 'Escape') {
      setIsCreatingFile(false);
      setNewFileName('');
    }
  };

  const handleAddDependency = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newDepName) {
      const newPackageJson = {
        ...packageJson,
        dependencies: {
          ...dependencies,
          [newDepName]: 'latest'
        }
      };
      updateFile('/package.json', JSON.stringify(newPackageJson, null, 2));
      setNewDepName('');
      setIsAddingDep(false);
    } else if (e.key === 'Escape') {
      setIsAddingDep(false);
      setNewDepName('');
    }
  };

  const handleRemoveDependency = (depName: string) => {
    const newDependencies = { ...dependencies };
    delete newDependencies[depName];
    const newPackageJson = {
      ...packageJson,
      dependencies: newDependencies
    };
    updateFile('/package.json', JSON.stringify(newPackageJson, null, 2));
  };

  return (
    <div className="flex h-full w-64 flex-col bg-[#1e1e1e] border-r border-zinc-800 text-sm text-zinc-300">
      {/* Explorer */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 uppercase tracking-wider text-xs font-semibold text-zinc-500">
          <span>Explorer</span>
          <div className="flex gap-2">
            <button onClick={() => setIsCreatingFile(true)} className="hover:text-white"><FilePlus size={14} /></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2">
          {fileList.map((path) => (
            <div 
              key={path}
              onClick={() => sandpack.setActiveFile(path)}
              className={`group flex items-center justify-between rounded px-2 py-1 cursor-pointer ${activeFile === path ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-800/50 hover:text-zinc-100'}`}
            >
              <div className="flex items-center gap-2">
                <File size={14} className="text-zinc-500" />
                <span className="truncate">{path.replace('/', '')}</span>
              </div>
              {path !== '/App.tsx' && path !== '/index.tsx' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFile(path);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:text-red-400"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
          
          {isCreatingFile && (
            <div className="flex items-center gap-2 px-2 py-1 mt-1">
              <File size={14} className="text-zinc-500" />
              <input 
                autoFocus
                type="text" 
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={handleCreateFile}
                onBlur={() => setIsCreatingFile(false)}
                className="flex-1 bg-zinc-900 border border-indigo-500 rounded px-1 outline-none text-white text-xs py-0.5"
                placeholder="filename.tsx"
              />
            </div>
          )}
        </div>
      </div>

      {/* Dependencies */}
      <div className="flex flex-col border-t border-zinc-800 max-h-[40%]">
        <div className="flex items-center justify-between px-4 py-2 uppercase tracking-wider text-xs font-semibold text-zinc-500">
          <span>Dependencies</span>
          <button onClick={() => setIsAddingDep(true)} className="hover:text-white"><Plus size={14} /></button>
        </div>
        
        <div className="overflow-y-auto px-2 pb-4">
          {Object.entries(dependencies).map(([name]) => (
            <div key={name} className="group flex items-center justify-between rounded px-2 py-1 hover:bg-zinc-800/50">
              <div className="flex items-center gap-2 overflow-hidden">
                <Package size={14} className="text-indigo-400 shrink-0" />
                <span className="truncate text-zinc-300">{name}</span>
              </div>
              <button 
                onClick={() => handleRemoveDependency(name)}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 shrink-0 ml-2"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}

          {isAddingDep && (
            <div className="flex items-center gap-2 px-2 py-1 mt-1">
              <Package size={14} className="text-indigo-400" />
              <input 
                autoFocus
                type="text" 
                value={newDepName}
                onChange={(e) => setNewDepName(e.target.value)}
                onKeyDown={handleAddDependency}
                onBlur={() => setIsAddingDep(false)}
                className="flex-1 bg-zinc-900 border border-indigo-500 rounded px-1 outline-none text-white text-xs py-0.5"
                placeholder="package name"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
