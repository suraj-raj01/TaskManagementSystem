const mongodb  = require("mongoose")

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/tms"

mongodb.connect(mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected✅")
}).catch(err => {
    console.error("MongoDB connection error❌", err)
})
module.exports = {
    mongodbUri
}
