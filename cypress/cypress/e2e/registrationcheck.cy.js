describe('Registration and Login Tests with Multiple Users', () => {
    const users = [
      {
        name: 'John',
        lastName: 'Doe',
        email: `johndoe${Date.now()}@example.com`,
        password: 'ValidPass123',
      },
      {
        name: 'Jane',
        lastName: 'Smith',
        email: `janesmith${Date.now()}@example.com`,
        password: 'StrongPass456',
      },
      {
        name: 'Alice',
        lastName: 'Johnson',
        email: `alicejohnson${Date.now()}@example.com`,
        password: 'SecurePass789',
      }
    ];
  
    users.forEach((user) => {
      describe(`Testing registration and login for user: ${user.email}`, () => {
        
        beforeEach(() => {
          cy.visit('https://qauto.forstudy.space/');
          cy.get('a').contains('Registration').click(); 
        });
  
        it(`should successfully register user: ${user.email}`, () => {
          cy.get('input[name="name"]').type(user.name);
          cy.get('input[name="lastName"]').type(user.lastName);
          cy.get('input[name="email"]').type(user.email);
          cy.get('input[name="password"]').type(user.password);
          cy.get('input[name="repeatPassword"]').type(user.password);
  
          cy.get('button').contains('Register').click();
  
          cy.url().should('not.include', '/register'); 
          cy.contains('Log out').should('be.visible'); 
        });
  
        it(`should successfully log in with user: ${user.email}`, () => {
          cy.contains('Log out').click();
          cy.get('a').contains('Log in').click(); 
  
          cy.get('input[name="email"]').type(user.email);
          cy.get('input[name="password"]').type(user.password);
  
          cy.get('button').contains('Login').click();
  
          cy.url().should('not.include', '/login'); 
          cy.contains('Log out').should('be.visible');
        });
      });
    });
  });

  describe('Registration Form Errors Handling', () => {
    beforeEach(() => {
      cy.visit('https://qauto.forstudy.space/');
      cy.get('a').contains('Registration').click(); 
    });
  
    it('should display error messages for empty required fields', () => {
      cy.get('button').contains('Register').click();
       cy.get('input[name="name"]')
        .siblings('.error-message') 
        .should('contain', 'Name is required');
      
      cy.get('input[name="lastName"]')
        .siblings('.error-message')
        .should('contain', 'Last name is required');
  
      cy.get('input[name="email"]')
        .siblings('.error-message')
        .should('contain', 'Email required');
  
      cy.get('input[name="password"]')
        .siblings('.error-message')
        .should('contain', 'Password required');
  
      cy.get('input[name="repeatPassword"]')
        .siblings('.error-message')
        .should('contain', 'Re-enter password required');
    });
  
    it('should display error message for invalid email format', () => {
      cy.get('input[name="email"]').type('invalidEmail');
      cy.get('button').contains('Register').click();
  
      cy.get('input[name="email"]')
        .siblings('.error-message')
        .should('contain', 'Email is incorrect');
    });
  
    it('should display error message for invalid password length', () => {
      cy.get('input[name="password"]').type('short');
      cy.get('input[name="repeatPassword"]').type('short');
      cy.get('button').contains('Register').click();
      cy.get('input[name="password"]')
        .siblings('.error-message')
        .should('contain', 'Password has to be from 8 to 15 characters long');
    });
  
    it('should display error message for password mismatch', () => {
      cy.get('input[name="password"]').type('ValidPass123');
      cy.get('input[name="repeatPassword"]').type('DifferentPass123');
      cy.get('button').contains('Register').click();
  
           cy.get('input[name="repeatPassword"]')
        .siblings('.error-message')
        .should('contain', 'Passwords do not match');
    });
  
  });
  