import { useState } from 'react'

const getRandomInt = (max) => Math.floor(Math.random() * max)

const Button = ({onClick, text}) =>
    <button onClick={onClick}>{text}</button>

const Display = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const BestAnecdote = ({anecdote, votes}) => {
  if (votes < 1)  { // only show if at least one vote has been casted
    return (<></>)
  }
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <Display anecdote={anecdote} votes={votes} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'A smart person does not make all mistakes herself. She also gives others a chance.'
  ]

  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const zeros = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(zeros)
  const [best, setBest] = useState(0) // to avoid updating best anecdote when it is only a tie

  const handleNext = () => {
    let next = getRandomInt(anecdotes.length)
    // to avoid the same anecdote be displayed twice in a row
    let nbIter = 0
    const maxIter = 5 // to not get stuck in an infinite loop
    while (next == selected && nbIter < maxIter) {
      console.log('got same anecdote as before, so reshuffle')
      next = getRandomInt(anecdotes.length)
      nbIter += 1
    }
    console.log('shuffle successful, new anecdote will be number: ', next)
    // update state
    return setSelected(next)
  }

  const handleVotes = () => {
    let newVotes = votes.slice() // alternative: [...votes]
    newVotes[selected] += 1
    // update state
    setVotes(newVotes)
    console.log('Voted!  for anecdote number', selected)
    console.log('updated list of votes: ', newVotes)
    // only update best anecdote when challenger has strictly more votes than incumbent
    let maxVotes = Math.max(...newVotes)
    let indexOfMaxVotes = newVotes.findIndex((vote) => vote === maxVotes)
    if (newVotes[indexOfMaxVotes] !== newVotes[best] ) {
      console.log('We have a new winner!')
      // update state
      setBest(indexOfMaxVotes)
    } else {
      console.log('Max number of vote is tied but not surpassed, therefore no update of the best anecdote')
    }
    console.log('now reshuffle to avoid multiple voting (sorry)')
    handleNext()
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleVotes} text='vote'/>
      <Button onClick={handleNext} text='next anecdote'/>
      <BestAnecdote anecdote={anecdotes[best]} votes={votes[best]} />
    </div>
  )
}

export default App