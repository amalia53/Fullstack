import { useSelector, useDispatch } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  function compare(a, b) {
    if (a.votes > b.votes) {
      return -1
    } if (a.votes < b.votes) {
      return 1
    }
    return 0
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compare).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <div>
      <h2>create new</h2>
      <NewAnecdote/>
      </div>
    </div>
  )
}

export default App