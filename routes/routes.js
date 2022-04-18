const express = require('express');

const router = express.Router()

//Import DB API Model
const Model = require('../models/model');



//Post Method
/*router.post('/post', async (req, res) => {
    const data = new Model({
        address: req.body.address,
        cuisine: req.body.cuisine,
        grades: req.body.grades,
        name: req.body.name,
        restaurant_id: req.body.restaurant_id
    })
    //try-catch to catch errors and deliver success messages
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})*/

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        let{page, limit} = req.query
        if(!page){page = 1}
        if(!limit){limit = 10}
        const size = parseInt(limit)
        const skip = (page - 1)*size

        const data = await Model.find().limit(limit).skip(skip);        
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by Mongo ID Method
router.get('/getMongoID/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by Name Method
router.get('/getName/:name', async (req, res) => {
    try{
        let{page, limit} = req.query
        if(!page){page = 1}
        if(!limit){limit = 10}
        const size = parseInt(limit)
        const skip = (page - 1)*size

        const data = await Model.find({name: {$regex: req.params.name, $options: 'i'}}).limit(limit).skip(skip);
        res.json({page,limit,data})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by Cuisine Method
router.get('/getCuisine/:cuisine', async (req, res) => {
    try{
        let{page, limit} = req.query
        if(!page){page = 1}
        if(!limit){limit = 10}
        const size = parseInt(limit)
        const skip = (page - 1)*size

        const data = await Model.find({cuisine: {$regex: req.params.cuisine, $options: 'i'}}).limit(limit).skip(skip)
        res.json({page,limit,data});
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by RestaurantID
router.get('/getResID/:resid', async (req, res) => {
    try{
        const data = await Model.findOne({restauraunt_id: req.params.resid})
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by Street
router.get('/getStreet/:street', async (req, res) => {
    try{
        let{page, limit} = req.query
        if(!page){page = 1}
        if(!limit){limit = 10}
        const size = parseInt(limit)
        const skip = (page - 1)*size

        const data = await Model.find({'address.street': {$regex: req.params.street, $options: 'i'}}).limit(limit).skip(skip);
        res.json({page,limit,data})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by Grade
router.get('/getGrade/:grade', async (req, res) => {
    try{
        let{page, limit} = req.query
        if(!page){page = 1}
        if(!limit){limit = 10}
        const size = parseInt(limit)
        const skip = (page - 1)*size

        const data = await Model.find({'grades.grade': req.params.grade.toUpperCase()}).limit(limit).skip(skip);
        res.json({page,limit,data})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by grade, street, and/or cuisine
router.get('/getMulti', async (req, res) => {
    try{
        let{grade, street, cuisine, page, limit} = req.query
        if(!page){page = 1}
        if(!limit){limit = 10}
        const size = parseInt(limit)
        const skip = (page - 1)*size

        if(!grade){grade = " "}
        if(!street){street = " "}
        if(!cuisine){cuisine = " "}

        const data = await Model.find({'grades[0].grade': grade,
        'address.street': {$regex: street, $options: 'i'},
        cuisine: {$regex: cuisine, $options: 'i'}}).limit(limit).skip(skip);
        res.json({page,limit,data})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Update by ID Method
/*router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})*/

//Delete by ID Method
/*router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})*/

module.exports = router;