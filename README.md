# Tech Quiz
This project enhances a fully functional Tech Quiz application by integrating **Cypress** for both component and end-to-end testing. The application is built using MERN stack, featuring a React front end, a MongoDB database, and a Node.js/Express.js server and API.  

---
### [Video Walkthrough](https://www.loom.com/share/b8563b26ec14422ab213b0742b77dc4e?sid=96fd3ff9-5b48-4917-8428-0c45bbd76b2b)

## Table of Contents
* [Features](#features)
* [Installation](#installation)
* [Testing](#testing)
* [License](#license)
* [Contributing](#contributing)
* [Contact Information](#contact-information)

## Features
The quiz presents users with ten random questions and allows them to answer each before displaying their final score upon completion. Cypress testing ensures the application's reliability, verifying that users can start a quiz, answer questions, and view their results accurately.

### Cypress Testing GUI
![Screenshot of the Cypress Application](/Develop/client/public/Cypress_1.png)
![Screenshot of the Crypress Application](/Develop/client/public/Cypress_2.png)
### CLI Testing
![Screenshot of the Application in Terminal](/Develop/client/public/Terminal_CY_1.png)
![Screenshot of the Application in Terminal](/Develop/client/public/Terminal_CY_2.png)

##  Installation & Running the Application
1. Fork the repo to your local machine
2. Install the necessary dependencies using: 
   ```
   npm install
   ```
3. In the `Server` folder, create a `.env` file from the `.env.EXAMPLE` template. 
4. Run the application by starting the development server:
    ```
    npm run build
    npm run start:dev
    ```
5. Test the application locally by running the development server:
    ```
    npm run test
    ```

## Testing
The Cypress testing for this application focuses on the following: 
- **Component Tests:** Ensures the Quiz component functions correctly.
- **E2E Tests:** Simulates the full user flow and interactions, verifying the app's behavior from start to finish.

## License
This project is licensed under the ISC License.

## Contributing
Contributions welcome for this project! Feel free to fork the repository, make your changes, and submit a pull request.

## Contact
If you have any questions or feedback, feel free to reach out!
* GitHub: celeste-hayes 