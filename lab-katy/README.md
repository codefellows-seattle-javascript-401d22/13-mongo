#Installation#
1. download this repo to your machine
2. cd into that directory and run npm i to install all needed dependencies for the application
3. run the command </npm run start> or </node server.js> in your terminal to get your server up and running

##Endpoints

GET
//with a proper list id
localhost:3000/api/list/:listId

POST
//create a new list with a valid list name
localhost:3000/api/list

PUT
//edit an existing list with a proper list id
localhost:3000/api/list/:listId

DELETE
//delete a list by passing in the proper list id of the list you want to get rid of 
localhost:3000/api/list/:listId