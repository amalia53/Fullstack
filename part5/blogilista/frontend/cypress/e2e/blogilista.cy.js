
describe('Blogilista', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs')
    cy.contains('Log in')
  })
})

// it('Login form is shown', function() {
//   cy.visit('http://localhost:5173')
//   cy.contains('Log in')
//   cy.contains('LOGIN').click()
// })

// it('User can log in', function() {
//   const user = {
//     name: 'Test Person',
//     username: 'testperson',
//     password: 'testpassword'

//   }
//   cy.request('POST', 'http://localhost:3003/api/users/', user)
// })

// describe('when logged in', function () {
//   beforeEach(function () {
//     cy.visit('http://localhost:5173')
//     cy.contains('LOGIN').click()
//     cy.get('#username').type('testperson')
//     cy.get('#password').type('testpassword')
//     cy.get('#login-button').click()
//   })
// })
// })