const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  pass:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }, 
  natinality:{
    type: String,
    default: 'indian'
  },
  tokens:[
    {
      token:{
        type: String,
        required: true
      }
    }
  ],
  messages:[
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }
  ],
  image:{
    type: String,
    default: ''
  }
},{ timestamps: true });

user.pre('save',async function(next) {
  if(this.isModified('pass')){
    this.pass = await bcrypt.hash(this.pass, 10);
  }
  next();
})

user.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({
      token: token
    });
    await this.save();
    return token;
  }catch(err){
    console.log(err);
  }
}

user.methods.addMsg = async function(name,email,message){
  try{
    this.messages = this.messages.concat({
      name,email,message
    })
    await this.save();
    return this.message;
  }catch(err){
    console.log(err);
  }
}

const User = mongoose.model('User', user);
module.exports = User;
