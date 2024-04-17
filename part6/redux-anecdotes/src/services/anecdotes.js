import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

const vote = async (id) => {
  const res1 = await axios.get(`${baseUrl}/${id}`)
  const anecdoteToChange = res1.data
  const votedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
  }
  const res2 = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return res2.data
}


export default { getAll, createNew, vote }