const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      
      {props.parts.map(part =>
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      )}

    </div>
  )
}


const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )

}

const Course = (props) => {

  let total = 0

  props.course.parts.forEach(part => {

    total = total + part.exercises

  })

  return (

    <div>

      <Header course = {props.course.name} />
      <Content parts = {props.course.parts} />
      <p><strong>total of {total} exercises</strong></p>

    </div>
  )

}


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
      exercises:  7

    },

    {
    
    name: 'State of a component',
    exercises: 14

    }

  ]

}

  return (

    <div>
      <Course course = {course}
      />
      
    </div>
  )
}

export default App

