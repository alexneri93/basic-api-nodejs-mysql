# basic-api-nodejs-mysql
Basic CRUD API with nodejs + Express connected with DB (Mysql)

To test de API:

Create DB with MySQL (I used XAMPP)


In the APP directory where we have node-app.js:

npm init -y (in the package.json --> "main": "node-app.js"

npm i -D express mysql nodemon

npm i cors bodyparser

npm i -g nodemon


In the terminal, execute:

nodemon


Now, with Postman (https://www.postman.com/), we are able to test the API:

List all users: http://localhost:3050/players

Show a user by name: http://localhost:3050/players/"username"

Create user: http://localhost:3050/add-player

Update user: http://localhost:3050/update-player/"username"

Delete user: http://localhost:3050/delete-player/"username"
