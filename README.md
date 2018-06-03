# Snap Game

A simple and fun card game, written in React and TypeScript.
Project is based on create-react-app.
Rules:
2 Players game.
Select the desired number of cards to play with.
To start a game press: Start. You can reset the game anytime, by pressing Reset.
To draw a card, each player can click on his deck (or press `a` hotkey a for player1 and `k` for player2).
Player can click `Snap!` (or press `s` hotkey a for player1 and `l` for player2) anytime, when he sees 2 cards of the same rank in the pool. This makes the player a winner of the pool and it goes to the bottom of his deck. If a player clicks `Snap!` and no cards are of the same rank, the pool is automatically transferred to the other player.

![img](https://github.com/robertzlatarski/react-example-card-game/blob/master/game-screenshot.png)

## How to launch

run:
`npm install`
`npm start`

App runs on port `:3000`

If you want to run it with SSR enabled:
`npm install`
`npm run build`
`npm run compile-server`
`npm run start-server`

App runs on port `:3001`

## Things left to do/consider

Consider using Redux for state management and extract logic from App.tsx.
Add option for dynamically adding/removing players.
Improve Server Sider Rendering and its build process and eject app to configure webpack.

## Available scripts

### `npm start`

Runs the app in the development mode

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

### `npm run compile-server`

Compiles server files and outputs to build/dist.

### `npm run watch-server`

Compiles server and watches for changes.

### `npm run start-server`

After server is compiled and client is built, you can start the server with this command on port 3001. Used for SSR.
