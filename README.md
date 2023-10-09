# flashcards
[Codecademy's](https://www.codecademy.com/learn) JavaScript project using [React](https://react.dev/), [React-Redux](https://react-redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/).

## Challenge Project: Flashcards
Overview
Instead of a step-by-step tutorial, this project contains a series of open-ended requirements that describe the project you’ll be building. There are many possible ways to correctly fulfill all of these requirements, and you should expect to use the internet, Codecademy, and other resources when you encounter a problem that you cannot easily solve.

Project Goals
In this project, you will practice using Redux and Redux Toolkit to manage the complex state of a flashcard-style quiz app. Users will be able to create their own topics, quizzes for those topics, and flashcards for those quizzes. Users will also be able to interact with their quizzes by flipping flashcards over.

The following task descriptions will walk through implementing the app’s Redux logic, starting with topics, then quizzes, and then cards. If you would like to implement it in a different order, feel free to do what is comfortable for you.

Setup Instructions
If you choose to do this project on your computer instead of Codecademy, you can download what you’ll need by clicking the “Download” button below. Make sure you have [Node installed on your computer](https://www.codecademy.com/articles/setting-up-node-locally) and then, inside the project’s root directory, run npm install. Finally, run npm start which will automatically open up a new tab in your browser with your running application. If a new tab does not appear, you can visit http://localhost:3000/.

[Download](https://static-assets.codecademy.com/skillpaths/react-redux/flashcards-starting-code-react-v18.zip?_gl=1*11v4c7d*_ga*NDk3Mzk5MDMyMy4xNjc3Njk2MDE3*_ga_3LRZM6TM9L*MTY5Njg2MDIwNC41MzguMS4xNjk2ODYxNDkzLjU4LjAuMA..)

## Tasks
## Prerequisites
1. This app uses uuidv4() function from the [uuid](https://www.npmjs.com/package/uuid) package to create unique identifiers for topics/quizzes/cards. Below, you can see an example of how this function is used:
```js
import { v4 as uuidv4 } from 'uuid';

let uniqueId = uuidv4(); 

console.log(uniqueId); // Prints '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```
Though not required, if you would like to learn more about this function, check out its [documentation](https://www.npmjs.com/package/uuid#uuidv4options-buffer-offset).

2. This app uses react-router to handle routing between different pages. Since react-router is outside the scope of this project, we’ve written the routing code for you. Though not required, if you’re curious about how it works, you can explore App.js (where the routes for this app are defined), read the [react-router docs](https://reactrouter.com/), or take our [Learn React Router](https://www.codecademy.com/learn/learn-react-router) course!

## Project Requirements
3. At a high level, your application will be able to handle the following URL routes, each with their own functionality:

On the '/topics/new' page:

- Users can create topics

On the '/topics' page: * Users can view all topics * Users can click on an individual topic and be redirected to the page for that topic

On the /topics/:topicId page:

- Users can view an individual topic and all quizzes for that topic * Users can click on a quiz associated with a topic and be redirected to that quiz’s page

On the 'quizzes/new' page:

- Users can create quizzes that are associated with topics and contain lists of flashcards * Users can add and remove card fields in the new quiz form

On the '/quizzes' page:

- Users can view all quizzes * Users can click on an individual quiz and be redirected to that quiz’s page

On the '/quizzes/:quizId' page:

- Users can view an individual quiz and flip cards over

4. Before you start writing code, take a moment to review our recommended state structure:

- Your app will include three slices: one for topics, one for quizzes, and one for cards.
- Each slice’s state should include an object storing all the topics/quizzes/cards keyed by their id. This will allow you to quickly retrieve an object’s information whenever you need to look it up.
- Each individual quiz will have a topicId value corresponding to an individual topic in state.
- Similarly, each topic which will have a quizIds array corresponding to the associated quizzes in state.

All together, your app state will look like this:
```js
{
  topics: {
    topics: {
      '123': {
        id: '123',
        name: 'example topic',
        icon: 'icon url',
        quizIds: ['456']
      }
    }
  },
  quizzes: {
    quizzes: {
      '456': {
        id: '456',
        topicId: '123',
        name: 'quiz for example topic',
        cardIds: ['789', '101', '102']
      }
    }
  },
  cards: {
    cards: {
      '789': {
        id: '789',
        front: 'front text',
        back: 'back text'
      },
      '101': {
        id: '101',
        front: 'front text',
        back: 'back text'
      },
      '102': {
        id: '102',
        front: 'front text',
        back: 'back text'
      },
    }
  }
}
```
5. Your first task is to write code to manage the state associated with topics. In the src/features/topics directory, create a new file containing a slice that:

- Is named topicsSlice.
- Has initial state consisting of an object that includes one property, topics, which corresponds to an empty object. This inner topics object will eventually hold all topics keyed by id.
- Has an addTopic action. You can expect the payload for this action to look like {id: '123456', name: 'name of topic', icon: 'icon url'}. Store these values in the state as a new topic object.
- Each topic object added to the state should also have a quizIds property, which will correspond to an array containing the ids of each quiz associated with the topic. When a topic is first created, it won’t have any associated quizzes, but you should still create an empty quizIds array so that all topics in the state conform to the same shape.
- Create a selector that selects the topics object nested within initialState.
- Export the selector as well as the action creators and reducer that your slice generates.

6. Add the topics slice to the app’s store.

7. In src/features/topics/Topics.js, import the selector defined in your slice and use it to access all the topics in state, and replace the empty object currently assigned to topics with the topics in state.

8. Next, you’ll need to hook the new topic form up to the action creators your slice generates. In src/components/NewTopicForm.js, import addTopic and dispatch it from the event handler that runs when the new topic form is submitted.

Verify that your code is working by filling out the form and submitting it. You should be redirected to the /topics page and should see your newly created topic there.

9. Great work! Now that you can create topics, your next task is to build out the necessary functionality to add quizzes to your app. This will involve creating two new slices—one for the quizzes themselves and one for the cards that comprise them—and adding an action to your topics slice to associate quizzes with the topic to which they belong. To start, create in the src/features/quizzes directory, create a new file containing a slice for quizzes that:

- Is named 'quizzesSlice'
- Has initial state consisting of an object that includes one property, quizzes, which corresponds to an empty object. This inner quizzes object will eventually hold all quizzes keyed by id.
- Has an addQuiz action. This action will receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.
- Has a selector which returns all quizzes from state.
- Export the selector as well as the action creators and reducer that your slice generates.
- Is added to the store.

10. Next, you should add an action to your topics slice that adds a quiz’s id to the quizIds array of the topic with which the newly created quiz is associated. This action will receive the same payload the quizzes slice addQuiz action received in the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}.

11. To test your work, you’ll need to connect your action creator to src/components/NewQuizForm and make sure the component works. First, import your topics selector from your topics slice and replace the variable topics, which is currently assigned an empty object, with a call to that selector.

12. Next, import the action from your quiz slice and dispatch it from the handleSubmit() event handler that fires when the new quiz form is submitted.

- Remember, that action creator expects to receive a payload of the form { id: '123', name: 'quiz name', topicId: '456', cardIds: ['1', '2', '3', ...]}. You’ll have to generate an id by calling uuidv4. For now, pass the empty cardIds array variable for the cardIds property (you’ll change that in a later task).
- Test that your action creator works by filling out the new quiz form. After your quiz is created you should be rerouted to the /quizzes page and should see your newly created quiz there.

*Note: If you are doing this project on Codecademy.com, the URL bar may not change (but the user interface should!)*

13. Lastly, import your selector in src/features/quizzes/Quizzes.js, src/features/quizzes/Quiz.js, and src/features/topics/Topic.js and make sure those components are displaying the correct data:

- The Quizzes component should render a Link for each quiz value in the quizzes slice of state.
- The Quiz component uses the react-router-dom method useParams() to determine the quizId to render. Therefore, it needs the full set of quizzes to find the appropriate quiz object to render.
- The Topic component should replace the empty object assigned to quizzes with the selector.

14. Great work! Next, in the src/features/cards directory, create a new file containing slice for cards that:

- Is named 'cardsSlice'
- Has initial state consisting of an object that includes one property, cards, which corresponds to an empty object. This inner cards object will eventually hold all cards keyed by id.
- Has an addCard action. This action will receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}.
- Has a selector that returns a card with the given id.
- Is added to the store.

15. Lastly, connect your addCard action creator to the new quiz form. In src/components/NewQuizForm, in the event handler that fires when the quiz form is submitted, iterate through the cards in that form’s local state, and for each one:

- dispatch your addCard action creator. You will have to generate an id for each card using uuidv4.
- Store the id you create for each card in the cardIds array we’ve provided for you. Remember, your action creator expects to receive a payload of the form { id: '123', front: 'front of card', back: 'back of card'}. You want to collect all the cardIds in an array so that you can pass them to the action creator that generates new quizzes. To use uuidv4 to create an id, call the function like so: uuidv4().

16. You previously passed an empty array for cardIds to the action creator that generates a new quiz. Now that you have written code to collect an array of all the cardIds created whenever the new quiz form is submitted, replace the empty array with this array of cardIds.

To test that your code is working, create a new quiz with some cards. Navigate to that quiz from the /quizzes page, and verify that your cards show up. Flip them over by clicking on them to make sure that you’ve correctly captured all of the state belonging to each card.

17. Now that you can add new cards, you’ll need to display cards on the individual quiz page. The Quiz component renders a list of Card components, so in src/features/cards/Card.js, import your cards selector and use it to access all the cards in state.

## Solution
18. Great work! Visit [our forums](https://discuss.codecademy.com/t/flashcards-challenge-project-redux/576779?_gl=1*murlqm*_ga*NDk3Mzk5MDMyMy4xNjc3Njk2MDE3*_ga_3LRZM6TM9L*MTY5Njg2NDk2My41MzkuMS4xNjk2ODY1MDUwLjU0LjAuMA..) to compare your project to our sample solution code. You can also learn how to host your own solution on GitHub so you can share it with other learners! Your solution might look different from ours, and that’s okay! There are multiple ways to solve these projects, and you’ll learn more by seeing others’ code.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
