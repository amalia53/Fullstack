import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = ({ good, neutral, bad }) => {

  const all = () => (
    good + neutral + bad
  )

  const average = () => (
    (good - bad) / all()
  )

  const positive = () => (
    good / all()
  )
  
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all()}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()} %</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='GOOD' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='NEUTRAL' />
      <Button handleClick={() => setBad(bad + 1)} text='BAD' />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App