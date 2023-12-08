
describe('Blogilista', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Person',
      username: 'testperson',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Log in')
    cy.contains('LOGIN').click()
  })


  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testperson')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testperson')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testperson')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('CREATE A NEW BLOG')
      cy.get('#showCreateButton').click()
      cy.contains('Create new')
      cy.get('#newTitle').type('New Title')
      cy.get('#newAuthor').type('New Author')
      cy.get('#newUrl').type('New Url')
      cy.get('#createButton').click()
      cy.contains('New Title by New Author')
    })

    describe('A blog', function () {
      beforeEach(function () {
        cy.get('#showCreateButton').click()
        cy.get('#newTitle').type('New Title')
        cy.get('#newAuthor').type('New Author')
        cy.get('#newUrl').type('New Url')
        cy.get('#createButton').click()
        cy.get('#viewMoreButton').click()
      })

      it('can be liked', function () {
        cy.contains('likes 0')
        cy.get('#likeButton').click()
        cy.contains('likes 1')
      })
      it('can be deleted', function () {
        cy.contains('New Title')
        cy.contains('DELETE')
        cy.get('#deleteButton').click()
        cy.contains('New Title').should('not.exist')
      })

    })
  })
})