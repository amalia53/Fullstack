
describe('Blogilista', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.createUser({
      name: 'Test Person',
      username: 'testperson',
      password: 'testpassword'
    })
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
      cy.login({ username: 'testperson', password: 'testpassword' })
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
        cy.createBlog({
          title: 'New Title',
          author: 'New Author',
          url: 'New Url'
        })
      })

      it('can be liked', function () {
        cy.get('#viewMoreButton').click()
        cy.contains('likes 0')
        cy.get('#likeButton').click()
        cy.contains('likes 1')
      })
      it('can be deleted', function () {
        cy.createBlog({
          title: 'Deletable Title',
          author: 'Deletable Author',
          url: 'Deletable Url'
        })
        cy.contains('Deletable Title by Deletable Author')
          .contains('VIEW').click()
        cy.get('#deleteButton').click()
        cy.contains('New Title')
        cy.contains('Deleted Deletable Title by Deletable Author')
        cy.wait(5000)
        cy.contains('Deletable Title by Deletable Author').should('not.exist')
      })
      it('deletion button can only be seen by adder', function () {
        cy.get('#viewMoreButton').click()
        cy.get('#deleteButton')
        cy.contains('LOGOUT').click()
        cy.createUser({
          name: 'Test Person 2',
          username: 'testperson2',
          password: 'testpassword2'
        })
        cy.login({ username: 'testperson2', password: 'testpassword2' })
        cy.get('#viewMoreButton').click()
        cy.contains('DELETE').should('not.exist')
      })
    })
  })
})
