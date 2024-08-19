describe('Header and Footer Tests', () => {
    const username = "guest";
    const password = "welcome2qauto";
  
    beforeEach(() => {
      cy.visit(`https://${username}:${password}@qauto.forstudy.space/`);
      cy.get('body').should('be.visible');
    });
  
    context("Header Buttons", () => {
      it("should find the 'Sign In' button and click it", () => {
        cy.get("button").contains("Sign In").should("be.visible").click();
      });
  
      it("should find the 'Guest log in' button and click it", () => {
        cy.get("button").contains("Guest log in").should("be.visible").click();
      });
  
      it("should find the 'Contacts' button and click it", () => {
        cy.get("button").contains("Contacts").should("be.visible").click();
      });
  
      it("should find the 'About' button and click it", () => {
        cy.get("button").contains("About").should("be.visible").click();
      });
  
      it("should find the 'Home' button and click it", () => {
        cy.get("a").contains("Home").should("be.visible").click();
      });
    });
  
    context("Footer Links and Buttons", () => {
      it("should find the Facebook link and click it", () => {
        cy.get("a[href*='facebook']").should("be.visible").click();
      });
  
      it("should find the Telegram link and click it", () => {
        cy.get("a[href*='t.me']").should("be.visible").click();
      });
  
      it("should find the YouTube link and click it", () => {
        cy.get("a[href*='youtube']").should("be.visible").click();
      });
  
      it("should find the Instagram link and click it", () => {
        cy.get("a[href*='instagram']").should("be.visible").click();
      });
  
      it("should find the LinkedIn link and click it", () => {
        cy.get("a[href*='linkedin']").should("be.visible").click();
      });
  
      it("should find the ithillel.ua link", () => {
        cy.get("a[href*='ithillel']")
          .should("be.visible")
          .and("include.text", "ithillel.ua");
      });
  
      it("should find the support email link", () => {
        cy.get("a[href*='mailto']")
          .should("be.visible")
          .and("include.text", "support@ithillel.ua");
      });
    });
  });
  