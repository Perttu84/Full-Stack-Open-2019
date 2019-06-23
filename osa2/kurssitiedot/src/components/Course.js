import React from 'react'

const Header = (props) => {
	return (
		<h2>
		  {props.course.name}
		</h2>
	)
}

const Part = (props) => {
	return (
	    <p>
	      {props.part.name} {props.part.exercises}
	    </p>
	)
}

const Content = ({parts}) => {

	const rows = () => parts.map((part) => <Part part={part} key={part.id}/>)
	return (
	  <>
        {rows()}
      </>
	)
}

const Total = (props) => {
	return (
	    <p><strong>total of {props.parts.map(part => part.exercises).reduce( (s, p) => s + p)} exercises</strong></p>
	)
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course