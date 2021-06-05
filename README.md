# Demo

https://github-indexer.netlify.app/

# How to test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Make sure environment for React is already setup properly (Node 14 or later)
1. Run `npm install` or `yarn`
1. Run `npm start` (this required to run E2E test)
1. In another terminal, run `npm test`

# How to run application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

1. Make sure environment for React is already setup properly (Node 14 or later)
1. Run `npm install` or `yarn`
1. Run `npm start`

# Compromises / Shortcuts

1. User page and admin page (for report) are combined in single page. There is a toggle switch on top right of the page to change the view
1. Due to limited amount of time, this project does not abide by SOLID principle. But few good practices are followed, such as separation logic from view (hook and component), no inline style and etc.
1. UI / UX is not a focus. (Not really responsive, user friendly etc).
1. Search history records are stored in browser's local storage to display report for admin.
1. Due to not enough time to follow clean architecture, some of the functionality is not testable (such as API call, sort result and many other small functions), but simple unit test and end to end testing is included. Can follow above step to test
