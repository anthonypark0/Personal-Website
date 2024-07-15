import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";

function App() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus()
    },[])
    return (
        <html>
      <div className="App"
          onClick={e => { inputRef.current.focus()}}
            >

                <div className="output"> {output} </div>
          <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                  if (e.key === "Enter") {
                      //window.alert("Test");
                      let newOutput = "";
                      newOutput = "\n" + "$ " + input + "\n";
                      switch (input) {
                          case "ls":
                              newOutput += "List of projects";
                              break;
                          case "pwd":
                              newOutput += "You're on my terminal site";
                              break;
                          default:
                              newOutput += "Unknown Command";
                      }
                      setOutput(newOutput);
                      setInput("");
                  }
              }}
          />
          <div className="terminal"></div>
             
            </div>
        </html>
  );
}

export default App;
