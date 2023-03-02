const router = require("express").Router();
/* 
    ? Create a file inside the models called Cars.js
    ? inside it create a schema that will take the following:
    * make (str, required)
    * model (str, required)
    * year (number, required)
    * color (str, required)
    * vin (str, required)
    * drivetrain (str, required)
    * fuel (str. required)
    * engine (str, required)
    * mileage (number, required)
*/
const Car = require("../models/Car");
// Create an endpoint that has a post method
// the full url for this endpoint is : http://127.0.0.1:4000/car/create

router.post("/create", (req, res) => {
    try {
        const carIncoming = req.body
        
        const newCar = new Car(carIncoming)
        
        newCar.save()
        
        res.status(201).json({
        message: `Car saved!`,
        newCar
    });
    } catch (error) {
        res.status(500).json({
        message: `${err}`,
        });
    }
});

router.get("/getall", async (req, res) => {
    try {
        const allCars = await Car.find()
            res.status(200).json(allCars)
    } catch (error) {
        res.status(500).json({
        message: `${error}`,
        });
    }
})

router.get("/getone/:id", async (req, res) => {
    try {
        const { id } = req.params
        const findItem = await Car.findById(id)
        res.status(200).json(findItem)
    } catch (error) {
        res.status(500).json({
            message: `Error: ${err}`
        })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const findItem = await Car.findByIdAndDelete(id);
        res.status(200).json({
            message: `Car successfully deleted`,
            findItem
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedItem = await Car.updateOne(
            {_id: id },
            { $set: newCar }
        )

        res.status(200).json({
            message: `Car Successfully Updated`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
})

module.exports = router;
