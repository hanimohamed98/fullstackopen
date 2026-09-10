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

export default Course


