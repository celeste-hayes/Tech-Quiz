describe("Quiz E2E", () => {
    beforeEach(() => {
        // Load the home page
        cy.visit("/");
        cy.intercept("GET", "/api/questions/random").as("getQuestions");
    });
    
    const startQuiz = () => {
        // Click start quiz and wait for the API response
        cy.contains("button", "Start Quiz", { timeout: 3000 }).click();
        cy.wait("@getQuestions").its("response.body").should("be.an", "array").and("not.be.empty");
    };

    it("should fetch questions from the database and display the first question", () => {
        startQuiz();
        cy.wait("@getQuestions").then(({ response }) => {
            expect(response).to.not.be.undefined;
            const questions = response?.body as any[];
            expect(questions[0]).to.have.property("question").and.not.be.empty;
            expect(questions[0].answers).to.be.an("array").and.not.be.empty;
            // Verify the first question is displayed
            cy.contains("h2", questions[0].question, { timeout: 3000 }).should("be.visible");
        });
    });

    it("should move to the next question after selecting an answer", () => {
        startQuiz();
        cy.wait("@getQuestions").then(({ response }) => {
            const questions = response?.body as any[];
            const correctAnswer = questions[0].answers.find((a: any) => a.correct)?.text;
            if (!correctAnswer) throw new Error("No correct answer found");
            // Click correct answer and verify next question appears
            cy.contains("button", correctAnswer, { timeout: 3000 }).click();
            cy.contains("h2", questions[1].question, { timeout: 3000 }).should("be.visible");
        });
    });

    it("should complete the quiz and show final score", () => {
        startQuiz();
        cy.wait("@getQuestions").then(({ response }) => {
            const questions = response?.body as any[];
            // Answer all questions correctly
            questions.forEach(q => {
                const correctAnswer = q.answers.find((a: any) => a.correct)?.text;
                if (!correctAnswer) throw new Error("No correct answer found");

                cy.contains("button", correctAnswer, { timeout: 3000 }).click();
            });
            // Verify quiz completion
            cy.contains("h2", "Quiz Completed", { timeout: 3000 }).should("be.visible");
            cy.contains("Your score: 2/2", { timeout: 3000 }).should("be.visible");
        });
    });

    it("should allow restarting the quiz", () => {
        startQuiz();
        cy.wait("@getQuestions").then(({ response }) => {
            const questions = response?.body as any[];
            // Answer all questions
            questions.forEach(q => {
                const correctAnswer = q.answers.find((a: any) => a.correct)?.text;
                if (!correctAnswer) throw new Error("No correct answer found");

                cy.contains("button", correctAnswer, { timeout: 3000 }).click();
            });
            // Restart the quiz
            cy.contains("button", "Take New Quiz", { timeout: 3000 }).click();
            // Ensure the first question appears again
            cy.contains("h2", questions[0].question, { timeout: 3000 }).should("be.visible");
        });
    });
});