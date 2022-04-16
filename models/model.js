const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    address: {
        //required: true,        
        building: {
            //required: true,
            type: String
        },
        street: {
            //required: true,
            type: String            
        }                
    },
    cuisine: {
        required: true,
        type: String
    },
    grades: {
        type: [{
            date: Date,
            grade: String,
            score: Number,
            _id: false
        }],
        default: undefined
        //required: true
    },
    name: {
        required: true,
        index: true,
        type: String        
    },
    restaurant_id: {
        required: true,
        index: true,
        type: String        
    }    
},{versionKey: false})

module.exports = mongoose.model('Data', restaurantSchema)

/*const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)*/