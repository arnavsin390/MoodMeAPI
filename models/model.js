const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    address: {
                
        building: {
            
            type: String
        },
        street: {
            
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