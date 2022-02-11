import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
	const parts = []
	course.parts.forEach(part => {
		parts.push(<Part key={part.name} part={part} />)
	});
	return (
		<>
			{parts}
		</>
	)
}

export default Content