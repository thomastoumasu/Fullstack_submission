const Header = ({text}) => <h2>{text}</h2>

const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <>
      {parts.map(
        part => <Part part={part} key={part.id}/>
      )}
    </>
  )
}

const Total = ({exercises}) =>
  <b>total of {
    exercises.reduce(
      (total, exercise) => {
        return total += exercise
      }, 0
    )
  } exercises </b>

const Course = ({course}) => {
  return (
      <>
      <Header text={course.name}/>
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(element => element.exercises)} />
      </>
  )
}

export default Course
