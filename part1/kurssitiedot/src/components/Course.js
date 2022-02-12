import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = (name, id, parts) => {
	const course = {
		name: name,
		parts: parts
	}
	return (
		{
			id: id,
			text: 
			<>
				<Header course={course} />
				<Content course={course} />
				<b>Total of <Total course={course} /> exercises</b>
			</>
		}
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