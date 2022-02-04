import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <p>Number of exercises <Total parts={course.parts} /></p>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part parts={props.parts} part={1} />
      <Part parts={props.parts} part={2} />
      <Part parts={props.parts} part={3} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.parts[props.part - 1].name} {props.parts[props.part - 1].exercises}
    </p>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(value => {
    total += value.exercises
  })

  return (
    <>
      {total}
    </>
  )
}

export default App