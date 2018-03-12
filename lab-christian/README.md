![cf](https://i.imgur.com/7v5ASc8.png) Lab 13: MongoDB
======


## Single Resource API (MONGO)

## Upgraded to Double Resource API

## Installation 

1. To install this application, clone this repository to a local directory on your machine
2. Navigate to the new directory and run `npm i` to install all node packages.
3. Install mongodb -- on a Mac, run `brew update` then `brew install mongodb`. For extra database configuration issues, see `https://treehouse.github.io/installation-guides/mac/mongo-mac.html`!
3. Use `npm run start` or `node server.js` to start the server connection, or `npm run test` to run the associated tests.


## Endpoints


## List Routes

#### GET REQUEST:  `localhost:3000/api/list/:listId` With a valid ID, a user can look up a specific list

#### POST REQUEST:  `localhost:3000/api/list/:listId` Create a new list

#### PUT REQUEST:  `localhost:3000/api/list/:listId` With a valid ID, a user can update a specific list

#### DELETE REQUEST:  `localhost:3000/api/list/:listId` With a valid ID, a user can delete a specific list

## Movie Routes

#### GET REQUEST: `localhost:3000/api/movie/:movieId` With a valid ID, a user can look up a specific movie

#### POST REQUEST: `localhost:3000/api/list/:listId/movie` With a valid list ID, a user can create a movie, and add it to the associated list.

#### PUT REQUEST: `localhost:3000/api/movie/:movieId` With a valid ID, a user can update a specific movie

#### DELETE REQUEST: `localhost:3000/api/movie/:movieId` With a valid ID, a user can delete a specific movie

