import './App.css';
import { useState, useEffect } from 'react';
import FolderTree from './components/FolderTree';
import ContentDisplay from './components/ContentDisplay';
import Terminal from './components/Terminal';
import GlobeDots from './components/GlobeDots';

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
      <main className="main-content">
        {!showWarning && <GlobeDots />}
        {showWarning ? (
          <div className="warning">
            ⚠️ Kirtan's System has been breached. Information is flowing...
          </div>
        ) : (
          <>
            <div className="content-wrapper">
              <div style={{ flex: 1, overflowY: 'auto', maxHeight: '70vh' }}>
                <ContentDisplay selected={selected} />
              </div>
              <FolderTree onSelect={handleSelect} />
            </div>
            <Terminal logs={logs} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;