import { createContext, useState } from "react";

const ProgressCon = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState('');

  function updateProgress(progressed, total) {
    if (total === 0) {
      setProgress(0);
      return;
    }

    setProgress((progressed / total) * 100);
  }

  return (
    <ProgressCon.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressCon.Provider>
  )
}

export default ProgressCon;