# Consigliere

Welcome to Consigliere, a web-app to help you make decisions.

This web-app is built using `create-react-app` and uses `ReactFlow` to house the decision making tool.

The journey is broken down into 3 steps:

- 1: Create Choices (between 2 and 5)
- 2: Create Attributes (up to 3; a sustainability attribute is created by default)
- 3: Weigh up your options! The best choice based on your weightings will be shown to you.

Like any good consigliere whispering in your ear would say, the decisions you make are your own but we can present to you your options.

To install and run this web-app on your machine, please follow these instructions:

- Clone down this repository
- Register for an account at https://www.pexels.com/api/ and get your free API key
- Create a `.env` file with the line `REACT_APP_PEXEL_API_KEY={YOUR_PEXEL_API_KEY_HERE}` in the root directory (NOT `/src`)
- Run `npm install` from the root directory (NOT `/src`)
- Once installation has been completed, run `npm start`
- Visit `localhost:3000` to see the web-app running!

Thanks, and enjoy.

(P.S There is always room for improvement, this codebase is by no means perfect!)
