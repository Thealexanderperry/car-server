const router = require("express").Router();
const fs = require('fs')
const { v4: uuid_v4 } = require("uuid");
const dbPath = "./db/cars.json";
// Create an endpoint that has a post method
// the full url for this endpoint is : http://127.0.0.1:4000/car/create

router.post("/create", (req, res) => {
    try {
        // generates an id for us
        const id = uuid_v4()
        // reads the current cars JSON file
        let cars = read()
        // destructuring the body in the request
        const {make, model, mileage, color} = req.body
        // packaging up the cars object to be inserted in the array
        const data = {id, make, model, mileage, color}
        // appending our data to the array before saving
        cars.push(data)
        // conducting a file system write and vertifying that it did save
        const isSaved = save(cars)

        if (!isSaved){
            throw Error(" car not saved")
        }


        res.json({message: "success from /create"})
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.get("/getall", (req, res) => {
    try {
        const cars = read();
        res.json({cars, message: "These are all of the cars..."})
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.get("/getone/", (req, res) => {
    try {
        let id = req.query.id
        let foundCar = findById(id)
        
        foundCar.length == 0
        ? res.status(404).json({
            message: `no car has been found`
        })
        : res.status(200).json({
            foundCar
        })
    } catch (error) {
        res.status(500).json({
            message: `Error: ${err}`
        })
    }
})

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    try {
        
        // TODO: see if the id exists
        const isCarFound = findById(id).length > 0 ? true : false;

        if (!isCarFound) {
            throw Error("Dude, where's your car?...")
        }
        // todo: remove the car
        const cars = read();
        const filteredCars = cars.filter(car => car.id !== id)

        // todo: save the filtered cars

        save(filteredCars);
        res.json({message: "successfully deleted your dumb car..."})
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

router.put("/update/:id", (req, res) => {
    try {
        const id = req.params.id
        const carFound = findById(id)
        isCarFound = carFound.length>0 ? true : false;

        if (!isCarFound) {
            throw Error("Where's your car dude?")
        }
        let cars = read();
        let carIndex = cars.findIndex(car=> carIndex.id === id)

        const make = req.body.make
        const model = req.body.model
        const mileage = req.body.mileage
        const color = req.body.color

        cars[carIndex].make = make
        cars[carIndex].model = model
        cars[carIndex].mileage = mileage
        cars[carIndex].color = color

        save(cars);

        res.json({message: "successfully updated!"})
    } catch (error) {
        res.status(500).json({
            message: error.message,
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

function findById(id){
    const cars = read();
    const filteredCars = cars.filter(car=> car.id === id)
    return filteredCars;
}

module.exports = router;
