describe('My First Test', () => {
    it('Checks if list content gets stored to local storage', () => {
      cy.visit('localhost:3000')

      var string1 = 'random string'
      var string2 = 'another random string'

      cy.contains('Add new item').click()
      
      cy.get('.TodoListItem__label').first()
        .type(string1).should('have.value', string1)

      cy.contains('Add new item').click()

      cy.get('.TodoListItem__label').eq(1)
        .type(string2).should('have.value', string2)

      cy.visit('localhost:3000').should(() => {
        expect(localStorage.getItem('task1')).to.eq(string1)
        expect(localStorage.getItem('task2')).to.eq(string2)
      })

      
    }),
    it('Doesnt allow multiple empty fields', () => {
      cy.visit('localhost:3000')

      for (let i = 10; i > 0; i--){
        cy.contains('Add new item').click()
      }

      cy.get('.TodoListItem').should('have.length', 2)

    }),
    it('All items have an "isDone" checkbox', () => {
      cy.visit('localhost:3000')

      var checkBoxAmount = 1

      cy.contains('Add new item').click()
      
      checkBoxAmount += 1

      cy.get('.TodoListItem__label').first()
        .type('tedxt').should('have.value', 'tedxt')

      cy.contains('Add new item').click()

      checkBoxAmount += 1

      cy.get('.TodoListItem__label').eq(1)
        .type('more textts').should('have.value', 'more textts')

      cy.contains('Add new item').click()

      checkBoxAmount += 1

      cy.get('.TodoListItem__toggle').should('have.length', checkBoxAmount)
    }),
    it('Text should be editable, but not removable', () => {
      cy.visit('localhost:3000')

      cy.contains('Add new item').click()

      cy.get('.TodoListItem__label').first()
        .type('hello').should('have.value', 'hello')

      cy.get('.TodoListItem__label').first()
        .clear()
        .should('not.be.empty')
    }),
    it('Should have a delete option', () => {
      cy.visit('localhost:3000')

      var itemsInList = 0

      cy.contains('Add new item').click()

      itemsInList += 1

      cy.get('.TodoListItem__label').first()
        .type('hello').should('have.value', 'hello')

      cy.contains('Add new item').click()

      itemsInList += 1

      cy.get('.TodoListItem__remove').first().click()

      itemsInList -= 1

      cy.get('.TodoListItem__remove').first().click()

      itemsInList -= 1

      cy.contains('.TodoListItem').should('have.length', itemsInList)
    }),
    it('Should have drag and drop functionality', () => {

      var item1 = 'hello'
      var item2 = 'hello again'

      cy.visit('localhost:3000')

      cy.contains('Add new item').click()

      cy.get('.TodoListItem__label').first()
        .type(item1).should('have.value', item1)

      cy.contains('Add new item').click()

      cy.get('.TodoListItem__label').eq(1)
        .type(item2).should('have.value', item2)

      cy.get('.TodoListItem').eq(1)
        .trigger('mousedown')
        .trigger('mousemove', {which: 1, pageX: 600, pageY: 200})

      cy.get('.TodoListItem__label').first()
        .should('have.value', item2)

    })
  })
  