import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    } else {
      const filtered = state.anecdotes.filter(object =>
        object.content.includes(state.filter))
      return filtered
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(anecdote.content))
    setTimeout(() => dispatch(setNotification('')), 5000)
  }

  const toSort = [...anecdotes]
  const sorted = toSort.sort(compare)

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
      {sorted.map(anecdote =>
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
    </div>
  )
}

export default AnecdoteList
