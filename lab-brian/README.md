# Code Fellows: Code 401d22: Full-Stack JavaScript

## Lab 11: Single Resource Express API

The purpose of this lab is to create a single resource API that utilizes ExpressJS for handling requests

## Tech/frameworks/packages

- node 
- npm
- node packages
  - Production
    - bluebird
    - body-parser 
    - debug
    - eslint
    - express
    - http-errors
    - morgan
    - uuid
  - Dev
    - jest
    - superagent


## How to use?
Clone this repo, cd into `lab-brian`, run `npm install`, brew install httpie if you do not already have it `brew install httpie`. 

Run `npm run start` to start the server.

Make POST/GET/DELETE/PUT requests to the server.

## Routes

#### `POST /api/house`

Create a new file with a JSON house object with the properties `year` and `city`.

```
http POST :3000/api/house city=Seattle price=$600,000
```

Throws an error if any of the requested properties are missing.


#### `GET /api/house/<house id>`

Retrieves a JSON house object with the properties `year` and `city` from your file system as requested by the <house id>.

```
http :3000/api/house/<house id>
```

Throws an error if the request parameter (id) is missing.

#### `DELETE /api/house/<house id>`

Deletes a specific house as requested by the <house id>.

```
http DELETE :3000/api/house/<house id>
```

If successful, a 204 status is returned.

Throws an error if the request parameter (id) is missing.


#### `PUT /api/house/<house id>`

Updates a JSON house object with the properties `year` and `city` from your file system as requested by the <house id>.

If successful, the house is returned with a 200 status.

If a request is made with a house id that is not found, a 404 status is returned.

If a request is made with no house id a 400 status is returned.

## Tests

run `jest` to check tests.

#### POST

1. should return the house object and a 200 status code if there is no error.
2. should respond with a 404 status code if there is no request body.

#### GET

1. should return the house object and a 200 status code if there is no error.
2. should respond with a 404 status code if a request is made with an id that is not found.
3. should respond with a 400 status code if there is no parameter (id).

#### DELETE

1. should return a 204 status code if there is no error.
2. should respond with a 400 status code if there is no parameter (id).

#### PUT

1. should update and return the updated house object along with a 200 status code if there is no error.
2. should respond with a 400 status code if there is no parameter (id).

## Contribute

You can totally contribute to this project if you want. Fork the repo, make some cool changes and then submit a PR.

## Credits

Initial codebase created by Code Fellows.

## License

MIT. Use it up!