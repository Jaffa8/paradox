
const connectDB = require("./db/index.js");
const app = require("./app.js");
require('dotenv').config()


console.log('port',process.env.PORT)

const PORT = process.env.PORT || 3001;
  
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    } catch (err) {
        console.log("MongoDB connection failed: ", err);
    }
}

startServer();