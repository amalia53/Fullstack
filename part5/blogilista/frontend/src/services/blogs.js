import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response.data)
  return response.data
}

const updateLikes = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }
  const likes = blogObject.likes + 1

  const updated = {
    id: blogObject.id,
    title: blogObject.title,
    author: blogObject.author,
    url: blogObject.url,
    likes: likes,
    user: blogObject.user
  }
  const blogUrl = baseUrl + blogObject.id
  const response = await axios.put(blogUrl, updated, config)
  return response.data
}

export default { getAll, create, setToken, updateLikes }