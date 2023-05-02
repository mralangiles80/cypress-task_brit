describe('Tests for Tahir', () => {
  beforeEach(() => {
    cy.viewport(1280, 720) // desktop
    cy.visit("http://www.britinsurance.com/")
    // wait for the second video slide to display to assume page has fully loaded
    cy.get('.component--hero__content').should('be.visible').should('contain.text', "we're forward thinkers")
  })

  it("Scenario 1 - Verify there are 3 search results and their titles are correct", () => {
    const searchTerm = 'IFRS 17'
    const firstResult = 'Interim results for the six months ended 30 June 2022'
    const secondResult = 'Gavin Wilkinson'
    const thirdResult = 'John King'

    cy.get('.component--header__search > button').should('be.visible').should('be.enabled').as('searchButton').click()
    cy.get('.header--search > input').should('be.visible').should('be.enabled').as('searchBox')
      .type(searchTerm + '{enter}')

    cy.get('.s-results').find('a').its('length').should('eq', 3)
    cy.get('.s-results').find('a').eq(0).contains(firstResult)
    cy.get('.s-results').find('a').eq(1).contains(secondResult)
    cy.get('.s-results').find('a').eq(2).contains(thirdResult)
  })

  it("Scenario 2 - Verify Office contact details contain correct address", () => {
    const officeName = 'Bermuda'
    const officeAddress = 'Pembroke, Hamilton HM 08, Bermuda'

    cy.get('.header--toggle').should('be.visible').should('be.enabled').as('burgerButton').click()
    cy.get('.secondary').find('a').contains("contact").as('contactButton').click()
    cy.get('.component--container').find('h2').contains(officeName + " Office").parents('.component--container')
      .find('.component--content').find('address').as('officeAddressText')
      
    cy.get('@officeAddressText').should("contain", officeAddress)
  })
})