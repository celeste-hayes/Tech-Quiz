describe('Quiz E2E', () => {
  beforeEach(() => {
      // Load the home page
      cy.visit('/');
  });

  it('should fetch questions from the database and display the first question', () => {
      // Intercept the GET request to /api/questions/random and monitor it as "getQuestions"
      cy.intercept("GET", "/api/questions/random").as("getQuestions");
     // Click start quiz and begin quiz
      cy.contains("button", "Start Quiz").click();
      // Wait for the API response
      cy.wait("@getQuestions").then((interception) => {
          // Ensure the intercepted response is defined
          expect(interception.response).to.not.be.undefined;
          // Validate that the response body is an array and not empty
          expect(interception.response!.body).to.be.an("array").and.not.be.empty;
          if (interception.response) {
              const firstQuestion = interception.response.body[0];
              // Verify the first question is displayed with the correct properties
              expect(firstQuestion).to.have.property("question").and.not.be.empty;
              expect(firstQuestion).to.have.property("answers").and.be.an("array").and.not.be.empty;
              // Ensure that the first question is displayed correctly on the UI
              cy.contains("h2", firstQuestion.question, { timeout: 3000 }).should("be.visible");
          } else {
              throw new Error("Interception response is undefined or null");
          }
      });
  });
});