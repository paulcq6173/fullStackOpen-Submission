import { useState } from "react";
import "./styles/global.css";

const StatisticLine = (props) => {
  const isPositive = props.text === "positive: ";

  return (
    <span>
      {props.text}
      {props.value}
      {isPositive && " %"}
      <br />
    </span>
  );
};

const Statistics = (props) => {
  const arr = Object.values(props.allClicks);
  const g = arr.filter((e) => e === "good").length;
  const n = arr.filter((e) => e === "neutral").length;
  const b = arr.filter((e) => e === "bad").length;
  const total = g + n + b;
  const averageValue = (g - b) / total;
  const percentage = (g / total) * 100;

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className="text-base">
              <StatisticLine text="good " />
            </td>
            <td>{g}</td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral " />
            </td>
            <td>{n}</td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad " />
            </td>
            <td>{b}</td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="all " />
            </td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="average " />
            </td>
            <td>{averageValue}</td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="positive " />
            </td>
            <td>{percentage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setAll(allClicks.concat("good"));
    const newValue = good + 1;
    setGood(newValue);
    setTotal(total + 1);
  };
  const handleNeutralClick = () => {
    setAll(allClicks.concat("neutral"));
    const newValue = neutral + 1;
    setNeutral(newValue);
    setTotal(total + 1);
  };
  const handleBadClick = () => {
    setAll(allClicks.concat("bad"));
    const newValue = bad + 1;
    setBad(newValue);
    setTotal(total + 1);
  };
  console.log(`good: ${good} neutral: ${neutral} bad: ${bad}`);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      </div>
      <h1>Statistics</h1>
      {allClicks.length === 0 ? (
        "No feedback given"
      ) : (
        <Statistics allClicks={allClicks} />
      )}
    </div>
  );
};

export default App;
