
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

    it.only('fails with wrong credentials', function () {
      cy.get('#username').type('testperson')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong credentials')
    })
  })
})