import React from 'react'
import Course from './components/Course'

const App = () => {
  const courses = [
    Course('Half Stack application development', 1, [
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
      },
      {
        name: 'Communicating with server',
        exercises: 12
      }
    ]),
    Course('Node.js', 2,[
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ])
  ]
  return (
    <>
      {courses.map(course => <div key={course.id}>{course.text}</div> )}
    </>
  )
}

export default App