import React, { useState, useEffect } from "react";
import Prism from "prismjs"; // Import PrismJS
import "prismjs/themes/prism-okaidia.css"; // Import PrismJS theme CSS
import "./CE.css"; // Import component-specific CSS
import "prismjs/components/prism-javascript"; // Optional: Import other language components

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleChange = (e) => {
    setCode(e.target.value);
    Prism.highlightAll();
  };

  const clearCode=()=>{
    return setConsoleOutput([]);
  };

  const runCode = () => {
    try {
      // Clear previous console output
      setConsoleOutput([]);
      
      eval(code);
    } catch (error) {
      // Log and display any errors
      console.error(error);
      setConsoleOutput((prevOutput) => [...prevOutput, error.toString()]);
    }
  };

  // Override console.log to capture output
  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      originalConsoleLog(...args); // Preserve default behavior
      setConsoleOutput((prevOutput) => [...prevOutput, args.join(" ")]);
    };
    return () => {
      console.log = originalConsoleLog; // Restore original console.log
    };
  }, []);

  return (
    <div className="code-editor">
      <div className="editor-container">
        <textarea
          className="code-editor-textarea"
          value={code}
          onChange={handleChange}
          placeholder="Type your code here..."
        />
        <div className="code-editor-preview">
          <button className="console-button" onClick={runCode}>Console</button>
          <button className="clear-button" onClick={clearCode}>Clear</button>
          <pre>
            <code className="language-javascript">{code}</code>
          </pre>
          <div className="console">
            {consoleOutput.map((output, index) => (
              <div key={index}>{output}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

