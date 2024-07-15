import './bruh.css';
import { useEffect, useState, useRef } from "react";
import Proph from './proph';
import App from './App';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function Bruh() {
    const [input, setInput] = useState("");
    const [outputHistory, setOutputHistory] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        if (!gamestart) {
            inputRef.current.focus();
        }
    }, []);
    
    const maxHistorySize = 10; // Maximum number of lines to keep in history
    const [gamestart, setGamestart] = useState(false);
    const handleCommand = (command) => {
        let newOutput = [...outputHistory];

        switch (command.trim()) {
            case "clear":
                newOutput = [];
                break;
            case "help":
                newOutput.push("$ " + command + "\nAvailable Commands: start game, stop game, ls, pwd, clear");
                break;
            case "start game":
                newOutput = [];
                setGamestart(true);
                break;
            case "stop game":
                newOutput = [];
                setGamestart(false);
                break;
            case "ls":
                newOutput.push("$ " + command + "\nList of projects");
                break;
            case "pwd":
                newOutput.push("$ " + command + "\nYou're on my terminal site");
                break;
            default:
                newOutput.push("$ " + command + "\nUnknown Command, try help for a list of commands");
        }

        // Trim the history to maxHistorySize
        if (newOutput.length > maxHistorySize) {
            newOutput = newOutput.slice(-maxHistorySize);
        }

        setOutputHistory(newOutput);
        setInput("");
    };

    return (
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet" />
            </head>
            

            <body>
              
                <div id="screen" onClick={e => { inputRef.current.focus() }}>
                    <img src="scanlines.png" id="scan" className="noselect" />
                   <img src="bezel.png" id="bezel" className="noselect" /> 

                    <div id="content">
                        < input
                            ref={inputRef}
                            id="mine"
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    handleCommand(input);
                                }

                            }}
                        />
                        <div id="terminal">
                            {gamestart && <Proph />}
                            {outputHistory.map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}

                           
                        </div>
                    </div>
                </div>

            </body>
        </html>
    );
}

export default Bruh;
