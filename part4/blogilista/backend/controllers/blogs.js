const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json()
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || '0'
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

    const toBeDeleted = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(toBeDeleted)
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updated = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || '0'
    }

    const toBeUpdated = await Blog.findByIdAndUpdate(request.params.id, updated, { new : true })
    response.json(toBeUpdated)
})

module.exports = blogsRouter