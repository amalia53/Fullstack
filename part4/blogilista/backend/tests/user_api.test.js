const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct amount of users is returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(1)
})

test('identificator is named id', async () => {
    const response = await api.get('/api/users')

    response.body.forEach(user => expect(user.id).toBeDefined())
})

test('a new user can be added', async () => {

    const startingUsers = await User.find({})
    const startingLength = startingUsers.length

    const newUser = {
        "username": "newusername",
        "name": "New Name",
        "password": "newpassword"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})

    expect(usersAtEnd).toHaveLength(startingLength + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('user with invalid username not created', async () => {

    const startingUsers = await User.find({})
    const startingLength = startingUsers.length

    const noUsername = {
        "name": "Person Test",
        "password": "testpassword"
    }

    const shortUsername = {
        "username": "P",
        "name": "Person Test",
        "password": "testpassword"
    }

    const errorNoPW = await api
        .post(`/api/users`)
        .send(noUsername)
        .expect(400)

    const errorShort = await api
        .post(`/api/users`)
        .send(shortUsername)
        .expect(400)

    expect(errorShort.body).toContain('Username must be at least 3 characters long')
    expect(errorNoPW.body).toContain('Username is required')

    const users = await User.find({})

    expect(users).toHaveLength(startingLength)
})

test('user with invalid password not created', async () => {

    const startingUsers = await User.find({})
    const startingLength = startingUsers.length

    const noPassword = {
        "username": "newperson",
        "name": "New Person",
    }
    const shortPassword = {
        "username": "newperson",
        "name": "New Person",
        "password": "te"
    }

    const errorNoPW = await api
        .post(`/api/users`)
        .send(noPassword)
        .expect(400)

    const errorShort = await api
        .post(`/api/users`)
        .send(shortPassword)
        .expect(400)

    expect(errorShort.body).toContain('Password must be at least 3 characters long')
    expect(errorNoPW.body).toContain('Password is required')

    const users = await User.find({})

    expect(users).toHaveLength(startingLength)
})

test('already taken username not created', async () => {

    const sameUsername = {
        "username": "root",
        "name": "Person Test",
        "password": "password"
    }
    const usersAtStart = await User.find({})
    const startingLength = usersAtStart.length

    const result = await api
        .post(`/api/users`)
        .send(sameUsername)
        .expect(400)

    expect(result.body).toContain('Username is already in use')

    const users = await User.find({})

    expect(users).toHaveLength(startingLength)
})

afterAll(async () => {
    await mongoose.connection.close()
})
