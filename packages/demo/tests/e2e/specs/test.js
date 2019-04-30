// https://docs.cypress.io/api/introduction/api.html

describe('Test demo', () => {
  // TODO: 更完善的测试
  it('Visits root url', () => {
    cy.visit('/')
    // cy.scrollTo(100)
  })

  it('cell page', () => {
    cy.visit('/cell')
  })

  it('button page', () => {
    cy.visit('/button')
  })
})
