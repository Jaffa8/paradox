
const dotenv = require("dotenv");
const connectDB = require("./db/index.js");
const app = require("./app.js");

dotenv.config({
    path: './.env'
});


const PORT = /*process.env.PORT ||*/ 3001;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(` Server is running at port : ${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB connection failed: ", err);
});
