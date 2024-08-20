describe("API Tests", () => {
    const baseUrl = "https://qauto.forstudy.space/api";
    const signinEndpoint = "/auth/signin";
    const username = "guest";
    const password = "welcome2qauto";
  
    beforeEach(() => {
      cy.request({
        method: "POST",
        url: `${baseUrl}${signinEndpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
        body: {
          email: "searapan@gmail.com",
          password: "AQAtest2024",
          remember: false,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
  
        cy.getCookie("sid").then((cookie) => {
          if (cookie) {
            cy.setCookie("sid", cookie.value);
            cy.getCookie("sid").should("have.property", "value", cookie.value);
          } else {
            throw new Error("SID cookie not found in setup");
          }
        });
      });
    });
  
    it("should get all expenses", () => {
      cy.getCookie("sid").then((cookie) => {
        if (cookie) {
          cy.request({
            method: "GET",
            url: `${baseUrl}/expenses`,
            headers: {
              "Content-Type": "application/json",
              Cookie: `sid=${cookie.value}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq("ok");
          });
        } else {
          throw new Error("SID cookie not found in test");
        }
      });
    });
  
    it("should create a new car", () => {
      cy.getCookie("sid").then((cookie) => {
        if (cookie) {
          cy.request({
            method: "POST",
            url: `${baseUrl}/cars`,
            headers: {
              "Content-Type": "application/json",
              Cookie: `sid=${cookie.value}`,
            },
            body: {
              carBrandId: 1,
              carModelId: 1,
              mileage: 122,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.status).to.eq("ok");
          });
        } else {
          throw new Error("SID cookie not found in test");
        }
      });
    });

    it("should get all cars for the current user", () => {
      cy.getCookie("sid").then((cookie) => {
        if (cookie) {
          cy.request({
            method: "GET",
            url: `${baseUrl}/cars`,
            headers: {
              "Content-Type": "application/json",
              Cookie: `sid=${cookie.value}`,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq("ok");
            expect(response.body.data).to.be.an("array");
          });
        } else {
          throw new Error("SID cookie not found in test");
        }
      });
    });
    it("should create a new expense", () => {
      cy.getCookie("sid").then((cookie) => {
        if (cookie) {
          cy.request({
            method: "POST",
            url: `${baseUrl}/expenses`,
            headers: {
              "Content-Type": "application/json",
            },
            cookies: {
              sid: cookie.value,
            },
            body: {
              carId: 186092,
              reportedAt: "2024-08-16T00:00:00.000Z",
              mileage: 124,
              liters: 10,
              totalCost: 10,
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq("ok");
          });
        } else {
          throw new Error("SID cookie not found in test");
        }
      });
    });
  });