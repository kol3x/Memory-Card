import "./App.css";
import links from "./links.json";
import Card from "./Card.jsx";
import { useState, useEffect } from "react";

let data = links;

const SCORE_TO_WIN = 6;

function App() {
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [bestRes, setBestRes] = useState(0);
  let leftToWin = SCORE_TO_WIN - score;

  function handleClick(event) {
    let id = event.target.id;
    if (!clicked.includes(id)) {
      setScore(score + 1);
      setClicked((prevClicked) => [...prevClicked, id]);
    } else {
      if (score > bestRes) setBestRes(score);
      setScore(0);
      setClicked([]);
    }
  }
  function handleRestart() {
    if (score === SCORE_TO_WIN) setScore(0);
  }

  useEffect(() => {
    console.log(clicked);
  }, [clicked]);

  data.sort(() => Math.random() - 0.5);

  return (
    <>
      {score < SCORE_TO_WIN ? (
        <>
          <h1>TMNT MEMORY CARDS</h1>
          {data.map((token) => (
            <Card
              imgKey={token.key}
              name={token.name}
              handleClick={handleClick}
              id={token.id}
              key={token.id}
            />
          ))}
          <h4>Current score: {score}</h4>
          <h4>Best result: {bestRes}</h4>
          <h4>{leftToWin} left to win!</h4>
        </>
      ) : (
        <>
          <h1>YOU WON! Keep turtling! Or whatever.</h1>
          <button onClick={handleRestart}>restart</button>
        </>
      )}
    </>
  );
}
export default App;
