import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = () => {
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
            },
            {
                name: 'Communicating with server',
                exercises: 12
            }
        ]
    }
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <p>Number of exercises <Total course={course} /></p>
        </>
    )
}

const Total = ({ course }) => {
    let total = 0
    course.parts.forEach(value => {
        total += value.exercises
    })

    return (
        <>
            {total}
        </>
    )
}

export default Course