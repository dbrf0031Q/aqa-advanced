
class LoginPage {
    visit() {
      const namep = Cypress.env("namep");
      const passwordp = Cypress.env("passwordp");
      cy.visit(`https://${namep}:${passwordp}@qauto.forstudy.space/`, {
        failOnStatusCode: false,
      });
    }
  
    clickSignInButton() {
      cy.get("button.header_signin").first().click();
    }
  
    fillEmail(email) {
      cy.get("input#signinEmail").type(email);
    }
  
    fillPassword(password) {
      cy.get("input#signinPassword").typePassword(password);
    }
  
    clickLoginButton() {
      cy.get("div.modal-footer").within(() => {
        cy.get("button.btn-primary").click();
      });
    }
  
    login(email, password) {
      this.clickSignInButton();
      this.fillEmail(email);
      this.fillPassword(password);
      this.clickLoginButton();
    }
  }
  
  export default LoginPage;
  
  describe("Registration Validation Tests", () => {
    const loginPage = new LoginPage();
    const { loginPassword } = Cypress.env();
    const uniqueEmail = `searapan${Date.now()}@gmail.com`;
  
    beforeEach(() => {
      loginPage.visit();
      cy.get("button.header_signin").first().click();
      cy.get("button").contains("Registration").click();
      cy.wait(1000);
    });
  
    context("Name Field Validations", () => {
      it("should show an error for empty 'Name' field", () => {
        cy.get("input#signupName").clear();
        cy.get("input#signupLastName").clear();
        cy.contains("Name required").should("be.visible");
        cy.get("input#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for invalid 'Name'", () => {
        cy.get("input#signupName").clear().type("!!");
        cy.get("input#signupLastName").clear();
        cy.contains("Name is invalid").should("be.visible");
        cy.get("input#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for wrong 'Name' length (less than 2 characters)", () => {
        cy.get("input#signupName").clear().type("A");
        cy.get("input#signupLastName").clear();
        cy.contains("Name has to be from 2 to 20 characters long").should(
          "be.visible"
        );
        cy.get("input#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for wrong 'Name' length (more than 20 characters)", () => {
        cy.get("input#signupName").clear().type("A".repeat(21));
        cy.get("input#signupLastName").clear();
        cy.contains("Name has to be from 2 to 20 characters long").should(
          "be.visible"
        );
        cy.get("input#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
    });
  
    context("Last Name Field Validations", () => {
      it("should show an error for empty 'Last name' field", () => {
        cy.get("input#signupLastName").clear();
        cy.get("input#signupName").clear();
        cy.contains("Last name required").should("be.visible");
        cy.get("input#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for invalid 'Last name'", () => {
        cy.get("input#signupLastName").clear().type("!!");
        cy.get("input#signupName").clear();
        cy.contains("Last name is invalid").should("be.visible");
        cy.get("input#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for wrong 'Last name' length (less than 2 characters)", () => {
        cy.get("input#signupLastName").clear().type("A");
        cy.get("input#signupName").clear();
        cy.contains("Last name has to be from 2 to 20 characters long").should(
          "be.visible"
        );
        cy.get("input#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for wrong 'Last name' length (more than 20 characters)", () => {
        cy.get("input#signupLastName").clear().type("A".repeat(21));
        cy.get("input#signupName").clear();
        cy.contains("Last name has to be from 2 to 20 characters long").should(
          "be.visible"
        );
        cy.get("input#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
    });
  
    context("Email Field Validations", () => {
      it("should show an error for invalid 'Email'", () => {
        cy.get("input#signupEmail").clear().type("invalidEmail");
        cy.get("input#signupName").clear();
        cy.contains("Email is incorrect").should("be.visible");
        cy.get("input#signupEmail").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for empty 'Email' field", () => {
        cy.get("input#signupEmail").clear();
        cy.get("input#signupName").clear();
        cy.contains("Email required").should("be.visible");
        cy.get("input#signupEmail").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
    });
  
    context("Password Field Validations", () => {
      it("should show an error for wrong 'Password' length (less than 8 characters)", () => {
        cy.get("input#signupPassword").clear().type("A1b");
        cy.get("input#signupName").clear();
        cy.contains(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ).should("be.visible");
        cy.get("input#signupPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for wrong 'Password' length (more than 15 characters)", () => {
        cy.get("input#signupPassword").clear().type("A1bcdefghijklmnop");
        cy.get("input#signupName").clear();
        cy.contains(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ).should("be.visible");
        cy.get("input#signupPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error if 'Password' does not contain at least one integer", () => {
        cy.get("input#signupPassword").clear().type("Abcdefgh");
        cy.get("input#signupName").clear();
        cy.contains(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ).should("be.visible");
        cy.get("input#signupPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error if 'Password' does not contain at least one capital letter", () => {
        cy.get("input#signupPassword").clear().type("1bcdefgh");
        cy.get("input#signupName").clear();
        cy.contains(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ).should("be.visible");
        cy.get("input#signupPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error if 'Password' does not contain at least one small letter", () => {
        cy.get("input#signupPassword").clear().type("1ABCDEFGH");
        cy.get("input#signupName").clear();
        cy.contains(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ).should("be.visible");
        cy.get("input#signupPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for empty 'Password' field", () => {
        cy.get("input#signupPassword").clear();
        cy.get("input#signupName").clear();
        cy.contains("Password required").should("be.visible");
        cy.get("input#signupPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
    });
  
    context("Re-enter Password Field Validations", () => {
      it("should show an error if passwords do not match", () => {
        cy.get("input#signupPassword").clear().type(loginPassword);
        cy.get("input#signupRepeatPassword").clear().type("DifferentPassw1");
        cy.get("input#signupName").clear();
        cy.contains("Passwords do not match").should("be.visible");
        cy.get("input#signupRepeatPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
  
      it("should show an error for empty 'Re-enter password' field", () => {
        cy.get("input#signupRepeatPassword").clear();
        cy.get("input#signupName").clear();
        cy.contains("Re-enter password required").should("be.visible");
        cy.get("input#signupRepeatPassword").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)"
        );
      });
    });
  
    context("Register Button Validations", () => {
      it("should disable the 'Register' button if data is incorrect", () => {
        cy.get("input#signupName").clear().type("A");
        cy.get("input#signupLastName").clear().type("B");
        cy.get("input#signupEmail").clear().type("invalidEmail");
        cy.get("input#signupPassword").clear().type("short");
        cy.get("input#signupRepeatPassword").clear().type("short");
        cy.get("button").contains("Register").should("be.disabled");
      });
  
      it("should successfully register a new user with valid data", () => {
        cy.get("input#signupName").clear().type("TestName");
        cy.get("input#signupLastName").clear().type("TestLastName");
        cy.get("input#signupEmail").clear().type(uniqueEmail);
        cy.get("input#signupPassword").clear().type(loginPassword);
        cy.get("input#signupRepeatPassword").clear().type(loginPassword);
        cy.get("button").contains("Register").click();
        cy.get("button#userNavDropdown")
          .contains(" My profile ")
          .should("be.visible");
      });
    });
  });

  describe("Login Test with Basic Authentication", () => {
    const loginPage = new LoginPage();
    const { loginEmail, loginPassword } = Cypress.env();
  
    it("should find the Sign In button and log in using the provided credentials", () => {
      loginPage.visit();
      loginPage.login(loginEmail, loginPassword);
    });
  });