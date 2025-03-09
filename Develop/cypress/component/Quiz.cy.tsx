import "../support/component";
import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
    beforeEach(() => {
        // GIVEN the API request returns quiz questions
        cy.intercept("GET", '/api/questions/random', { fixture: "questions.json" }).as("getQuestions");

        // Mount the Quiz component
        cy.mount(<Quiz />);
    })
    // GIVEN I am taking a tech quiz
    it("should display the start button", () => {
        // THEN I should see the start button
        cy.contains("button","Start Quiz").should("be.visible");
    })
    // WHEN I click the start button
    it("should start the quiz when the start button is clicked", () => {
        cy.contains("button","Start Quiz").click();

        // Wait for questions to load
        cy.wait("@getQuestions");

        // THEN I should see the first question
        cy.contains("h2", "Test question 1").should("be.visible");
    })
    // WHEN I answer a question
    it("should display the next question after answering the current question", () => {
        cy.contains("button","Start Quiz").click();
        cy.wait("@getQuestions");

        // THEN I should see the first question
        cy.contains("h2", "Test question 1").should("be.visible");

        // WHEN I select the correct answer
        cy.contains("correct").prev("button").click();

        // THEN the next question appears
        cy.contains("h2", "Test question 2").should("be.visible");
    });
    // WHEN all questions are answered
    it("should show quiz completed with score 2/2 when answering correctly", () => {
        cy.contains("button","Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer all questions correctly
        cy.contains("correct").prev("button").click();
        cy.contains("correct").prev("button").click();

        // THEN the quiz is over, verify final score
        cy.contains("h2", "Quiz Completed").should("be.visible");
        cy.contains(".alert-success", "Your score").then(($el) => {
            const actualText = $el.text();
            cy.log("Actual Score Text:", actualText);
        });
    });
    // WHEN all questions are answered
    it("should show quiz completed with score 1/2 when answering one question correctly", () => {
        cy.contains("button","Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer one question correctly and one incorrectly
        cy.contains("correct").prev("button").click();
        cy.contains("incorrect").prev("button").click();

        // THEN the quiz is over, verify final score
        cy.contains("h2", "Quiz Completed").should("be.visible");
        cy.contains(".alert-success", "Your score").then(($el) => {
            const actualText = $el.text();
            cy.log("Actual Score Text:", actualText);
        });
});
    // WHEN the quiz is over
    it("should allow the user to start a new quiz when clicking 'Take New Quiz'", () => {
        cy.contains("button","Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer all questions correctly
        cy.contains("correct").prev("button").click();
        cy.contains("correct").prev("button").click();

        // THEN the quiz is over
        cy.contains("h2", "Quiz Completed").should("be.visible");

        // WHEN I click "Take New Quiz"
        cy.contains("button","Take New Quiz").click();

        // THEN I should see the first question again
        cy.contains("h2", "Test question 1").should("be.visible");
    });
});