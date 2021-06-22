const mongoose = require('mongoose');

//const dbURL = process.env.DBURL;
const dbURL = "mongodb://localhost:27017/web"
mongoose.connect(dbURL,{
  useNewUrlParser: true , 
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: false
}).then((res) => {
    console.log("connection succesful");
}).catch((err) => 
console.log(err));