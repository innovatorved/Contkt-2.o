const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const connection = {};

const connectToMongo = async() => {
    console.log(mongoURI)
    if (connection.isConnected){
        return ;
    }
    
    const db = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.isConnected = db.connections[0].readyState;
}

module.exports = connectToMongo;