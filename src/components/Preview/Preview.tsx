import { type FC, useEffect, useRef } from 'react';
import { IFRAME_TEMPLATE } from '../../utils/constants';

interface PreviewProps {
  code: string;
  err: string;
}

const Preview: FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // Reset the iframe content
    iframeRef.current.srcdoc = IFRAME_TEMPLATE.replace('{{CODE}}', code);
  }, [code]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-zinc-800 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Preview</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-zinc-300" />
          <div className="h-2 w-2 rounded-full bg-zinc-300" />
        </div>
      </div>
      <div className="h-[calc(100%-40px)] w-full">
        <iframe
          ref={iframeRef}
          title="preview"
          sandbox="allow-scripts"
          className="h-full w-full border-none bg-white"
        />
        {err && (
          <div className="absolute bottom-0 left-0 right-0 max-h-[50%] overflow-auto bg-red-500/90 p-4 font-mono text-sm text-white backdrop-blur-md">
            <div className="mb-2 font-bold uppercase tracking-tight">Transpilation Error</div>
            <pre className="whitespace-pre-wrap">{err}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
