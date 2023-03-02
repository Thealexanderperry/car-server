# Getting Started

- Create the `package.json` file
- in the terminal you will use the command `npm init -y`
- install dependencies
    - `npm i express`
    - `npm nodemon --save-dev`
    - `npm dotenv`
    - create a `.env` file
    - create a `.gitignore` file
        - add `/node_modules`
        - add `.env`
    - update `package.json` main to app.js
        - i.e. ` "main": "app.js"`
        - add `"dev": "nodemon"` to the file


## Boiler Plate for Starting Server

```js
require("dotenv").config();
const express = require("express");
const app = express()

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST ;

app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});
```
## Preparing our server to handle JSON Objects
In the `app.js` file we need to add this line of code before our first rout.

```js
app.use(express.json());
```
##  CRUD (Create, Read, Update, Delete)
- Create : POST
- Read : GET
- Update : PUT or PATCH
- Delete : DELETE

## For Routing
For creating a new route, you will need to know the intended route and start in the `app.js` file.

For example:
<br>
Route to be built: `http://127.0.0.1:4000/car/create`
<br>
`app.js` will handle the `http://127.0.0.1:4000/car` portion.
<br>
`routes.js` will handle the `/create`

### Boiler Plate for Creating a NEW Controller

```js 
const router = require("express").Router();

module.exports = router;
```

### Basic Controller File Complete - Go To app.js and use the new controller

add the following to the `app.js`
```js
const carController = require("./controllers/auth");
app.use("/car", carController);
```
NOTE: the `app.use("car", carController);` needs to go after the `app.use(express.json());`

### Create the final endpoint (barebone) and test it out in Postman

#### Boiler Plate for Creatign a NEW Route on the Controller

```js
router.post("/create", (req, res) => {
    try {
        res.json({message: "success from /create"})
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})
```

## ID Generator uuid
- `npm install uuidv4`


# Schema Validation

        ### Mongoose
        
        An ODM (Object data mapper)
        
        - Provides a way for us to connect to our database
        - Provides us with methods to CRUD our database
        - Provides us with ways to model and schema our data

## Getting Started
- To install mongoose in our car-server:
``` npm i mongoos ```
- import ```mongooose``` into our ```app.js``` file
- import our mongo url from the .env file
- instantiate it with the following options:

```js
const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL

mongoose
    .connect(DB_URL, {
        useNewURlParser: true,        
        useUnifiedTopology: true
    })
    .then(console.log(`Connected to ${MONGO_URL}`))
    .catch(err => console.log(err))
```

### Schemas

A well-defined document data structure that will be inseted into a collection. It is used to create a mocel, and based on ```SchemaTypes``` (aka: data types)



