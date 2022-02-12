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
			<b>Total of <Total course={course} /> exercises</b>
		</>
	)
}

const Total = ({ course }) => {
	const exercises = course.parts.map(part => part.exercises)
	const reducer = (previousValue, currentValue) => previousValue + currentValue
	return (
		<>
			{exercises.reduce(reducer)}
		</>
	)
}

export default Course