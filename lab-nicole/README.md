## MongoDB

### Overview

This application creates an HTTP server utilizing express middleware. It uses MongoDB to house a 'doggo' model, which has two properties - name and age. The app has express, mongoose, cors, debug, and body-parser installed as dependencies, as well as jest, superagent, and morgan as developer dependencies.

If you would like to run the application, go to your terminal and start the server by typing ```npm run start```. You will see the message "listening on ${PORT}" with the port number that you are listening on displaying.

Once your server has started up, you can use another terminal window to send requests to the server.

*** Note: If you make a request to an incorrect route, the server will respond with a __404__, or not found.

### POST /api/doggo/

To make a POST request to the server, type
```
http POST :3000/api/doggo name={name} age={age}
```
with your name and age of the dog you want to be added. An _id property will be auto assigned to the 'doggo' by MongoDB.
- If a proper request is made, the server will respond with a status of __200__ and the doggo instance you have created.
- If you do not provide a proper request, the server will respond with a __400__ or 'bad request'.

### GET /api/doggo/id?={id}

To make a GET request to the server, type
```
http :3000/api/doggo/id?={id}
```
with the ID of the doggo you would like to retreive.
- If a proper request is made, the server will respond with a status of __200__ and the doggo document you requested.
- If you do not provide an ID, the server will respond with a __400__, or bad request.
- If you provide an ID that does not exist, the server will respond with a __404__, or 'not found'.

### PUT /api/doggo/id?={id}

To make a POST request to the server, type
```
http PUT :3000/api/doggo/id?={id} name={name} age={age}
```
with the ID of the doggo you would like to update and the properties you would like to assign it. The ID will remain the same.
- If a proper request is made, the server will respond with a status of __200__, and the updated doggo document.
- If you do not provide a correct ID, the server will respond with a __404__, or 'not found'.
- If you do not provide a proper request body, the server will respond with a __400__, or 'bad request'.

### DELETE /api/doggo/id?={id}

To make a delete request to the server, type
```
http DELETE :3000/api/doggo/id?={id}
```
with the ID of the dogg you would like to delete.
- If a proper request is made, the server will respond with a __204__, or 'no content'.