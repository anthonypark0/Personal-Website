import React, { useState, useEffect } from 'react';
import './proph.css';

function Proph() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [choices] = useState(['Start', 'Options', 'Credits']);
    const [showCredits, setShowCredits] = useState(false);

    // Handle keyboard events
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : choices.length - 1));
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex(prevIndex => (prevIndex < choices.length - 1 ? prevIndex + 1 : 0));
        } else if (event.key === 'ArrowRight' && selectedIndex === 2) {
            // Show credits page
            setShowCredits(true);
        } else if (event.key === 'ArrowRight' && selectedIndex === 0) {
            alert("start");
        } else if (event.key === 'ArrowRight' && selectedIndex === 1) {
            alert("options");
        } else if (event.key === 'ArrowLeft') {
            // Show credits page
            setShowCredits(false);
        }
    };

    // Attach event listener when component mounts
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex]); // Ensure to include selectedIndex in dependency array

    // Conditional rendering based on showCredits state
    if (showCredits) {
        return (
            <div>
                <h1>Made by Anthony Park</h1>
                <p>This project was created by Anthony Park.</p>
                <small> Press Left Arrow Key To Go Back To Main Menu </small>
            </div>
        );
    }

    // Default rendering for menu
    return (
        <div>
            <h1>The Prophecy</h1>
            <p>Use The Right Arrow Key To Select</p>
            <ul>
                {choices.map((choice, index) => (
                    <li key={index} className={index === selectedIndex ? 'selected' : ''}>
                        {choice}
                    </li>
                ))}
            </ul>
            <h4>Selected Choice: {choices[selectedIndex]}</h4>
        </div>
    );
}

export default Proph;
