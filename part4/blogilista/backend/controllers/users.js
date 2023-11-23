const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password === undefined || password.length < 3) {
        const errormessage =
            password === undefined
                ? 'Password is required'
                : 'Password must be at least 3 characters long'
        response.status(400).json(errormessage)
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        try {
            const users = await User.find({})
            const usernames = users.map(user => user.username)
            if (usernames.includes(username)) {
                response.status(400).json('Username is already in use')
            } else {
                const savedUser = await user.save()
                response.status(201).json(savedUser)
            }
        } catch (exception) {
            response.status(400).json(exception.errors.username.message)
        }
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author:1, url: 1, likes: 1})
    response.json(users)
})

module.exports = usersRouter