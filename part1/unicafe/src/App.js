import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <div>
    <p>{text}: {value}</p>
  </div>
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

  if (all() === 0) {
    return (
      <div>
        <StatisticsLine text='Good: ' value={good} />
        <StatisticsLine text='Neutral: ' value={neutral} />
        <StatisticsLine text='Bad: ' value={bad} />
      </div>
    )
  }

  return (
    <div>
      <StatisticsLine text='Good: ' value={good} />
      <StatisticsLine text='Neutral: ' value={neutral} />
      <StatisticsLine text='Bad: ' value={bad} />
      <StatisticsLine text='Average: ' value={average()} />
      <StatisticsLine text='Positive: ' value={positive()} />
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