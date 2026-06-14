import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
//Each card starts as unmatched, of corseu
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]); //Store all the cards currently in play
  const [turns, setTurns] = useState(0);// Tracks number of turns
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);//This prevent cards while comparing

  
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //array with two of the first array, so i have 12 in total. Duplicates the cards to create pairs.
      .sort(() => Math.random() - 0.5) //this method mixes the items. when the random numbers is negative, the cards remain the same order,and when is positive those will suffle
      .map((card) => ({ ...card, id: Math.random() })); //this funtion for each sorted arrya is repesented for the object card and i map it for the new arry and spreads the property of that card
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
 const handleChoice = (card) => {
  // Prevent selecting the same card that is already choiceOne
  if (choiceOne && choiceOne.id === card.id) return;
  
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
};

  //compare the 2 selected cards
 useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true);
    let timeoutId;

    if (choiceOne.src === choiceTwo.src) {
      // ... your existing match logic
      resetTurn();
    } else {
      timeoutId = setTimeout(() => resetTurn(), 1000);
    }
    
    // Cleanup function
    return () => clearTimeout(timeoutId);
  }
}, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //starts new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
