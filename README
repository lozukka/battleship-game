# Battleship Game

Battleship game built with vanilla JavaScript, featuring a ship placement phase, computer logic and hit/miss tracking.

[Play the game](https://lozukka.github.io/battleship-game/)

## Features

- Ship placement phase: place your ships manually by clicking cells, toggle direction between horizontal and vertical - or randomize placement with a button
- Hover highlighting: valid placements shown in green, invalid in red
- Computer logic: the computer attacks randomly without repeating coordinates
- Hit/miss tracking: hits and misses are marked visually on both boards
- Sunk ship detection: the game announces when ship is sunk
- Game over detection: the game ends when all ships on either side are sunk
- Play again: reset and start a new game withour refreshing the page

## Built With

- JavaScript (ES Modules)
- Webpack & webpack-dev-server
- Jest (unit testing)
- HTML & CSS
- Claude AI

## Running Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/lozukka/battleship-game.git
cd battleship-game
npm install
```

Start the development server:

```bash
npm start
```

Run tests:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Project Structure

```
battleship-game/
├── src/
│   ├── ship.js          — Ship factory
│   ├── gameboard.js     — Gameboard factory
│   ├── player.js        — Player factory
│   ├── game.js          — Game logic
│   ├── utils.js         — Shared helper functions
│   ├── styles.css       — Styles
│   ├── index.js         — Entry point
│   └── ui/
│       ├── renderBoard.js     — DOM rendering
│       ├── eventHandlers.js   — Game event handlers
│       └── shipPlacement.js   — Ship placement phase
├── tests/
│   ├── ship.test.js
│   ├── gameboard.test.js
│   ├── player.test.js
│   └── game.test.js
├── index.html
└── webpack.config.cjs
```

## What I Learned

This project was part of [The Odin Project](https://www.theodinproject.com/) curriculum. Here are the key things I learned along the way:

### Factory Functions and Closures

Building the game with factory functions instead of classes deepened my understanding of closures. A key lesson was that returning a primitive value from a factory captures the value at that moment, not a live reference. Getter functions are needed to expose values that change over time.

### Test-Driven Development with Jest

I wrote tests for each module before moving on to the next. This caught bugs early and gave me confidence when refactoring. It also taught me to think about what a function should return and how to structure code so it's testable.

### DOM Manipulation

I learned to build UI dynamically from JavaScript rather than hardcoding HTML, use event delegation to handle clicks on many elements with a single listener, and manage event listeners carefully — stacking listeners without cleaning them up caused subtle bugs that were tricky to track down.

### Webpack

Setting up Webpack from scratch taught me how module bundling works, how to configure loaders for CSS, and how to deploy to GitHub Pages with the correct public path.

### Debugging

Many bugs in this project came down to a few recurring patterns — code after a return statement that never runs, variables being undefined because they weren't in scope, and stale references after resetting state. Learning to read error messages carefully and add console.log in the right places made debugging much faster.

## Acknowledgements

Built as part of the [JavaScript course](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript) on The Odin Project.

## How I Used AI

I used Claude AI throughout this project. It helped me understand theory and explained concepts I was encountering for the first time. It reviewed my code and gave feedback on how to improve it to a more professional level. For some files, Claude provided a skeleton structure to give me a clearer picture of what needed to be done before I started coding. Claude also generated the initial draft of this README based on our conversations during the project.
