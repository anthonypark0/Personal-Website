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
    const [startScreen, setstartScreen] = useState(false);

    useEffect(() => {
        if (!gamestart) {
            inputRef.current.focus();
        }

        
    }, []);

    useEffect(() => {
        // Set gamestart to true if outputHistory is empty
        setstartScreen(outputHistory.length === 0 && !gamestart);
    }, [outputHistory]);

    const maxHistorySize = 7; // Maximum number of lines to keep in history
    const [gamestart, setGamestart] = useState(false);
    const handleCommand = (command) => {
        let newOutput = [...outputHistory];

        switch (command.trim()) {
            case "clear":
                newOutput = [];
                break;
            case "hello":
                newOutput.push("$ " + command + "\nHello World!");
                break;
            case "waste time":
                newOutput.push("$ " + command + "\nUse the commands \"start game\" and \"stop game\" to play an unfinished (but usable) version of \nBlackJack");
                break;
            case "about":
                newOutput = [];
                newOutput.push((<img src="IMG_4347.JPG" alt="Logo of the website" style={{ width: '300px', height: '200px' }}/>))
                newOutput.push("Hi! I'm Anthony Park. I'm currently a third-year student attending Northeastern University, with plans to graduate in the Spring of 2026." +
                    " I major in Computer Science, with a concentration in software. I am currently seeking an internship for the Summer of 2025. If " +
                    "you're looking for more information on"
                    + " my skills, projects, and work experience, type \"resume\" or \"github\". For contact information, type \"contact\". For other commands, type \"help\"")
                break;
            case "help":
                newOutput.push("$ " + command + "\nAvailable Commands: about, resume, github, contact, hello, waste time, clear");
                break;
            case "resume":
                newOutput.push("$ " + command + "\nDownload Link:");
                newOutput.push((<a href="Anthony_Park_Resume.pdf" download>Anthony Park Resume 2024</a>));
                break;
            case "contact":
                newOutput.push("$ " + command + "\nEmail: park.ant@northeastern.edu" + "\nLinkedIn: ");
                newOutput.push((<a href='https://www.linkedin.com/in/anthony-park0'>https://www.linkedin.com/in/anthony-park0</a>));
                break;
            case "start game":
                newOutput = [];
                setGamestart(true);
                break;
            case "stop game":
                setGamestart(false);
                break;
            case "ls":
                newOutput.push("$ " + command + "\nList of projects");
                break;
            case "pwd":
                newOutput.push("$ " + command + "\nYou're on my terminal site");
                break;
            case "github":
                newOutput.push("$ " + command + "\nVisit my GitHub profile: ");
                newOutput.push((<a href='https://github.com/anthonypark0'>https://github.com/anthonypark0</a>));
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
                            <div id="startText" className="animated-text" >
                                {startScreen && <div>  Welcome to my Website! My name is Anthony Park. Type "help" for list of commands.</div>}
                            </div>
                            {gamestart && <Proph />}
                            <div >
                            {outputHistory.map((line, index) => (
                                <div key={index}>{line}</div>

                            ))}
                            </div>
                        
                        </div>
                    </div>
                </div>

            </body>
        </html>
    );
}

export default Bruh;
