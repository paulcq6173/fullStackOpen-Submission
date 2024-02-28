import { useState } from "react";
import "./styles/global.css";

const CustomButton = (props) => {
  const { onClick, text } = props;

  return <button onClick={onClick}>{text}</button>;
};

function GetMostVotedItem() {
  return;
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const initCounter = Array(8).fill(0);
  const [selected, setSelected] = useState(0);
  const [arrVote, setArrVote] = useState(initCounter);
  const handleRndClick = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };
  const handleVoteClick = () => {
    const nextCounters = arrVote.map((vote, i) => {
      if (i === selected) {
        return vote + 1;
      } else {
        return vote;
      }
    });
    setArrVote(nextCounters);
  };
  let beginVoted = false;
  for (let i = 0; i < arrVote.length; i++) {
    if (arrVote[i] > 0) {
      beginVoted = true;
      break;
    }
  }
  const firstTopVotedIndex = () => {
    const orderedArr = [...arrVote].sort((a, b) => a - b);
    const maxVotedItemIndex = arrVote.findIndex((e) => e === orderedArr[7]);

    return maxVotedItemIndex;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <span>
        {anecdotes[selected]}
        <br />
        has {arrVote[selected] ? arrVote[selected] : 0} votes
        <br />
      </span>
      <CustomButton onClick={handleVoteClick} text="vote" />
      <CustomButton onClick={handleRndClick} text="next anecdote" />
      {beginVoted && (
        <div>
          <h1>Anecdote with most votes</h1>
          <span>
            {anecdotes[firstTopVotedIndex()]}
            <br />
            has {arrVote[firstTopVotedIndex()]} votes
            <br />
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
