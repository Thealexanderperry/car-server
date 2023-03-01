const router = require("express").Router()

// TODO: build a /register controller
const fs = require ('fs')
const dbPath = ("./db/Users.json")


router.post("/register", (req, res) => {
    try {
        let { name, email, password} = req.body
        // todo: grab a current snapshot of the database
        let userDB = read()
        // todo: check to see if user exists
        let userExistArray = userDB.filter(user=> user.email === email)
        if (userExistArray.length > 0) {
            throw Error("username already exists.")
        }
        
        // todo: add the new user ro the snapshot
        userDB.push({ name, email, password });
        
        // todo: save the new snapshot to rewrite the file
        const isSaved = save(userDB)
        // todo: what is save file is false?
        res.status(201).json({
            message: isSaved === true ? `User created`: "We had a problem",
        }) 
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// TODO: build a /login controller

router.post("/login", (req, res) => {
    console.log("login route hit.")
    try { 
        let { email, password} = req.body
        let userDB = read();
        let userLogin = userDB.filter((user) => user.email === email);
        console.log(userLogin)
        // todo: if the user doesnt exist then throw an err username doesnt exist
        // ! Checking to see if we have a user match
        if(userLogin.length === 0){
            throw Error("user does not exist")
        }

        // ! Passwords do not match
        if (userLogin[0].password !== password) {
            throw Error("user password does not match")
        }
        res.status(200).json({
            message: "Login success"
        })
    } catch (error){
        res.status(500).json({
            message: `${error}`,
        })
    }
})



function read() {
    const file = fs.readFileSync(dbPath);
    // converts a JSON object to object literal
    const fileObj = JSON.parse(file);
    return fileObj;
}

function save(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data), (error) => {
        if (error) {
            console.log(error)
            return false
        }
    })
    return true
}

module.exports = router