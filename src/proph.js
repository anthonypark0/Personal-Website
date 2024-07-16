import React, { useState, useEffect } from 'react';
import './proph.css';

function Proph() {
    const [over, setOver] = useState(0); // State for player's hand total
    const [dealerover, setDealerover] = useState(0); // State for dealer's hand total
    const [selectedIndex, setSelectedIndex] = useState(0); // State for selected menu index
    const [showCredits, setShowCredits] = useState(false); // State for showing credits
    const [showWin, setshowWin] = useState(false); // State for showing credits
    const [showBust, setshowBust] = useState(false); // State for showing credits
    const [showDealerBust, setshowDealerBust] = useState(false); // State for showing credits
    const [showLoss, setshowLoss] = useState(false); // State for showing credits
    const [choices] = useState(['Hit', 'Stay', 'New Hand']);

    // Function to deal a card to the player
    const deal = () => {
        let card = Math.floor(Math.random() * 11 + 1);
        setOver(prevOver => prevOver + card);
        document.getElementById('hand').innerHTML = document.getElementById('hand').textContent + " " + card;
    };

    // useEffect to handle actions after 'over' state changes
    useEffect(() => {
        // Check if over exceeds 21 after the update
        if (over > 21) {
            setshowBust(true);
         //   document.getElementById('hand').innerHTML = "Your hand: ";
         //   setOver(0); // Reset 'over' after bust
        }
    }, [over]); // Run this effect whenever 'over' changes

    // Function for dealer's turn
    const dealerTurn = () => {
        let theirCard1 = Math.floor(Math.random() * 11 + 1);
        let theirCard2 = Math.floor(Math.random() * 11 + 1);
        let theirCard3 = Math.floor(Math.random() * 11 + 1);
        let total = theirCard1 + theirCard2;

        setDealerover(total);
        document.getElementById('dealHand').innerHTML = document.getElementById('dealHand').textContent + " " + theirCard1 + " " + theirCard2;

        if (total < 17 || total < over) {
            setDealerover(prevDealerover => prevDealerover + theirCard3);
            document.getElementById('dealHand').innerHTML = document.getElementById('dealHand').textContent + " " + theirCard3;
        }

       
    };

    // useEffect to handle actions after 'over' state changes
    useEffect(() => {
        // Check if over exceeds 21 after the update
        if (dealerover > 21) {
            setshowDealerBust(true);
        } else if (dealerover < over) {
            setshowWin(true);
        } else if (over < dealerover) {
            setshowLoss(true);
        }
    }, [dealerover]); // Run this effect whenever 'over' changes

    // Handle keyboard events
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : choices.length - 1));
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex(prevIndex => (prevIndex < choices.length - 1 ? prevIndex + 1 : 0));
        } else if (event.key === 'ArrowRight' && selectedIndex === 2) {
            setShowCredits(false);
            document.getElementById('dealHand').innerHTML = "Dealer's Hand: ";
            document.getElementById('hand').innerHTML = "Your hand: ";
            setOver(0);
            setDealerover(0);
            setshowWin(false);
            setshowBust(false);
            setshowLoss(false);
            setshowDealerBust(false);
        } else if (event.key === 'ArrowRight' && selectedIndex === 0) {
            deal();
        } else if (event.key === 'ArrowRight' && selectedIndex === 1) {
            dealerTurn();
        } else if (event.key === 'ArrowLeft') {
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
            <h1>BlackJack</h1> {showWin && <h1> You Win! </h1>} {showBust && <h1> Bust! </h1>} {showLoss && <h1> You Lose! </h1>} {showDealerBust && <h1> Dealer Bust! </h1>}
            <p>Use The Right Arrow Key To Select</p>
            <ul>
                {choices.map((choice, index) => (
                    <li key={index} className={index === selectedIndex ? 'selected' : ''}>
                        {choice}
                    </li>
                ))}
            </ul>
            <h4>Selected Choice: {choices[selectedIndex]}</h4>
            <h4 id="hand">Your Hand: </h4> {/* Display current value of 'over' */}
            <h4 id="dealHand"> Dealer's Hand: </h4> {/* Display current value of 'dealerover' */}
        </div>
    );
}

export default Proph;
