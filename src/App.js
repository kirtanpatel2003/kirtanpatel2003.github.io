import './App.css';
import { useState, useEffect } from 'react';
import FolderTree from './components/FolderTree';
import ContentDisplay from './components/ContentDisplay';
import Terminal from './components/Terminal';

function App() {
  const [showWarning, setShowWarning] = useState(true);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    let command = "";

    if (item === "resume.pdf") {
      command = `brew install resume.pdf`;
    } else {
      command = logs.length > 0
        ? `cd .. && ls && cd ${item}`
        : `cd ${item}`;
    }

    setLogs((prevLogs) => [...prevLogs, command]);
  };

  return (
    <div className="container">
      {showWarning ? (
        <div className="warning">
          ⚠️ Kirtan's System has been breached. Information is flowing...
        </div>
      ) : (
        <>
          <div className="content-wrapper">
            <ContentDisplay selected={selected} />
            <FolderTree onSelect={handleSelect} />
          </div>
          <Terminal logs={logs} />
        </>
      )}
    </div>
  );
}

export default App;