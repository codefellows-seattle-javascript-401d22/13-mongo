# Code Fellows: Code 401d22: Full-Stack JavaScript

## Lab 13: MongoDB

I created an Express HTTP server to query a MongoDB and I utilized Express Router to create a route for doing restful crud operations against my MongoDB resource model.

## Tech/frameworks/packages

- node 
- MongoDB
- npm
- node packages
  - Production
    - bluebird
    - body-parser 
    - cors
    - debug
    - eslint
    - express
    - http-errors
    - morgan
    - mongoose
  - Dev
    - jest
    - superagent


## How to use?
Clone this repo, cd into `lab-brian`, run `npm install`, brew install httpie and mongodb if you do not already have them `brew install httpie mongodb`. Please refernce the installation instructions for MongoDB `https://docs.mongodb.com/manual/administration/install-community/`, there is typically 1 or 2 quick things you need to do after you Brew install it. 

Run `npm run start` from terminal to start the server. Open a new tab in terminal and run `mongod` to start the Mongo process. Open another terminal tab and run `mongo` to open a Mongo shell. Lastly, open ap a final terminal tab; this is where you will be making all of your server requests, instructions and examples are below.

Make POST/GET/DELETE/PUT requests to the server and your local MongoDB.

## Routes

#### `POST /api/food`

Create a new file with a JSON food object with the properties `price` and `name`.

```
http POST :3000/api/food name=Pizza price=19.95
```

Throws an error if any of the requested properties are missing.


#### `GET /api/food/<food id>`

Retrieves a JSON food object with the properties `price` and `name` from your MongoDB as requested by the <food id>.

```
http :3000/api/food/<food id>
```

Throws an error if the request parameter (id) is missing.

#### `DELETE /api/food/<food id>`

Deletes a specific food as requested by the <food id>.

```
http DELETE :3000/api/food/<food id>
```

If successful, a 204 status is returned.

Throws an error if the request parameter (id) is missing.


#### `PUT /api/food/<food id>`

Updates a JSON food object with the properties `price` and `name` from your MongoDB as requested by the <food id>.

If successful, the food is returned with a 200 status.

If a request is made with a food id that is not found, a 404 status is returned.

If a request is made with no food id a 400 status is returned.

## Tests

run `jest` to check tests.

#### POST

1. should return the food object and a 200 status code if there is no error.
2. should respond with a 400 status code if there is no request body.

#### GET

1. should return the food object and a 200 status code if there is no error.
2. should respond with a 404 status code if a request is made with an id that is not found.
3. should respond with a 200 status code and all foods if there is no parameter (id).

#### DELETE

1. should return a 204 status code if there is no error.
2. should respond with a 400 status code if there is no parameter (id).
3. should respond with a 404 status code if a request is made with an id that is not found.

#### PUT

1. should update and return the updated food object along with a 200 status code if there is no error.
2. should respond with a 400 status code if there is no parameter (id).
3. should respond with a 404 status code if a request is made with an id that is not found.

## Contribute

You can totally contribute to this project if you want. Fork the repo, make some cool changes and then submit a PR.

## Credits

Initial codebase created by Code Fellows.

## License

MIT. Use it up!