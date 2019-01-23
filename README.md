
# NACOpedia

A React-based employee portal used to write, store, and display all of a company's institutional knowledge. Uses Google Firebase for authentication, web functions, and NoSQL database. A Rich Text Editor allows for image upload and placement, video embeds, text formatting, etc. which is converted and displayed in html. Articles can be sorted by department and edited at a later date by their original author.

## Getting Started

Fork and clone the repository. Install the dependencies and create a .env file with your TinyMCE API key. Run 'npm start' to start the development server.

## Finished Product

![Dashboard. Some information blurred out for confidentiality.](https://github.com/nationalangelcapitalorganization/employee-portal-v2/blob/master/public/img/Dashboard.png?raw=true)

![Rich Text Editor](https://github.com/nationalangelcapitalorganization/employee-portal-v2/blob/master/public/img/Text-Editor.png?raw=true)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Dependencies

    @tinymce/tinymce-react
    firebase
    materialize-css
    moment
    react
    react-dom
    react-html-parser
    react-material-select
    react-materialize
    react-redux
    react-redux-firebase
    react-router-dom
    react-scripts
    redux
    redux-firestore
    redux-thunk
    uuid