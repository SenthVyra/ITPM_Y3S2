const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://senthvyra:www.senth28.lk@itpmapp.uoxdgut.mongodb.net/?retryWrites=true&w=majority')

//create model

const Campaign=mongoose.model('Campaign',{
    //schema creation
    id:String,
    garbage:String,
    cteam:String,
    quantity:String,
    status:String
})

module.exports={
    Campaign
}