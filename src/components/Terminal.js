import { useEffect, useRef } from 'react';

export default function Terminal({ logs }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="terminal" ref={terminalRef}>
      {logs.map((line, index) => (
        <p key={index}>&gt; {line}</p>
      ))}
    </div>
  );
}