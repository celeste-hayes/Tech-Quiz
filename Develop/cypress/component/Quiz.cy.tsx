import Quiz from "../../client/src/components/Quiz";

describe("<Quiz />", () => {
    beforeEach(() => {
        // GIVEN the API request returns quiz questions
        cy.intercept("GET", "/api/questions", { fixture: "questions.json" }).as("getQuestions");

        // Mount the Quiz component
        cy.mount(<Quiz />);
    });

    // GIVEN I am taking a tech quiz
    it("displays the start button when the quiz is not started", () => {
        // THEN I should see the start button
        cy.contains("button", "Start Quiz").should("be.visible");
    });

    // WHEN I click the start button
    it("starts the quiz when the start button is clicked", () => {
        cy.contains("button", "Start Quiz").click();

        // THEN the quiz starts, and the start button disappears
        cy.contains("button", "Start Quiz").should("not.exist");

        // Wait for questions to load
        cy.wait("@getQuestions");

        // THEN I should see the first question
        cy.contains("h2", "Test question 1").should("be.visible");
    });

    // WHEN I answer a question
    it("displays the next question after answering the current question", () => {
        cy.contains("button", "Start Quiz").click();
        cy.wait("@getQuestions");

        // THEN I should see the first question
        cy.contains("h2", "Test question 1").should("be.visible");

        // WHEN I select the correct answer
        cy.contains("correct").click();

        // THEN the next question appears
        cy.contains("h2", "Test question 2").should("be.visible");
    });

    // WHEN all questions are answered
    it("displays the quiz completion screen after the last question", () => {
        cy.contains("button", "Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer all questions correctly
        cy.contains("correct").click();
        cy.contains("correct").click();

        // THEN the quiz is over
        cy.contains("h2", "Quiz Completed").should("be.visible");
    });

    // WHEN the quiz is over
    it("displays the final score correctly", () => {
        cy.contains("button", "Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer one question correctly and one incorrectly
        cy.contains("correct").click();
        cy.contains("wrong").click();

        // THEN I can view my score
        cy.contains("h2", "Quiz Completed").should("be.visible");
        cy.contains("Your score: 1/2").should("be.visible");
    });

    // WHEN the quiz is over
    it("allows the user to start a new quiz", () => {
        cy.contains("button", "Start Quiz").click();
        cy.wait("@getQuestions");

        // Answer all questions correctly
        cy.contains("correct").click();
        cy.contains("correct").click();

        // THEN the quiz is over
        cy.contains("h2", "Quiz Completed").should("be.visible");

        // WHEN I click "Take New Quiz"
        cy.contains("button", "Take New Quiz").click();

        // THEN I should see the first question again
        cy.contains("h2", "Test question 1").should("be.visible");
    });
});