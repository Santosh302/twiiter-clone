// Importing require Modules

const express = require("express");
const app = express(); 
const cors = require("cors");
const {MONGODB_URL} = require('./config');
const { default: mongoose } = require("mongoose");
app.use(cors()); 
app.use(express.json());
 
mongoose.connect(MONGODB_URL);
global.__basedir = __dirname;
mongoose.connection.on('connected', ()=>{
    console.log("DB Connected!");
})
mongoose.connection.on('error', ()=>{
    console.log("Some error occurred while connecting!");
})

app.use(cors());
app.use(express.json());

  require('./models/post_model');
  require('./models/user_model');
   
  app.use(require('./Routes/post_route'));
  app.use(require('./Routes/user_route'));
  app.use(require('./Routes/file_route'));

// Close MongoDB connection when the server is stopped

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
  });
  

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});
