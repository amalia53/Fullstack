const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    try {
        jwt.verify(request.token, process.env.SECRET)
    } catch (error) {
        return response.status(400).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json()
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || '0',
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        jwt.verify(request.token, process.env.SECRET)
    } catch (error) {
        return response.status(400).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const requestedBlog  = await Blog.findById(request.params.id)
    
    if (decodedToken.id.toString() === requestedBlog.user.toString()) {
        const toBeDeleted = await Blog.findByIdAndDelete(request.params.id)
        response.status(204).json(toBeDeleted)
    } else {
        response.status(401)
            .json({ error: 'You are not the owner of the blog' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updated = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || '0'
    }

    const toBeUpdated = await Blog.findByIdAndUpdate(request.params.id, updated, { new: true })
    response.json(toBeUpdated)
})

module.exports = blogsRouter