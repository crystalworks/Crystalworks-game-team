# Nimomania

## Technologies used

- Phaser – HTML5 Game Framework
- HTML5, CSS3
- JavaScript

## Prerequisites

Install Node.js with [NVM](https://github.com/creationix/nvm):

    $ nvm install node

Install the latest [NPM](https://www.npmjs.com/) globally:

    $ npm install -g npm

Then install Webpack globally using NPM:

    $ npm install -g webpack

## Setup

Navigate to the `game` directory.

Install all dependencies with:

    $ npm install

## How to use

### Run the development server:

    $ npm run dev

This will run a server so you can run the game in a browser.

Open your browser and enter `localhost:3000` into the address bar.

Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser.

### Build for deployment:

    $ npm run deploy

This will optimize and minimize the compiled bundle.
