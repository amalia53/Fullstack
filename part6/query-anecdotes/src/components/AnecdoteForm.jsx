import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({ type: "SHORT", content: "" })
      setTimeout(() => { dispatch({ type: "NULLIFY", content: "" }) }, 5000)
    },
  })

  const dispatch = useNotificationDispatch()

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: "ADD", content: content })
    setTimeout(() => { dispatch({ type: "NULLIFY", content: content }) }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
