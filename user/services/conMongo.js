const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(MONGO, { serverSelectionTimeoutMS: 5000 });
        console.log("Connect is successful")
    } catch (error) {
        console.log("Connect is failed")
    }
}

process.on('SIGINT', async () => {
    await connect.close()
    console.log("Connect is closed")
    process.exit(0)
})
module.exports = connect;
