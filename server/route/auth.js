const express = require('express');
const bcrypt = require('bcryptjs');
const authUser = require('../middleware/authUser');

const router = express.Router();

const User = require('../mongo/models');
//! HOME
router.get('/home',(req,res) => {
  //console.log(req.rootUser);
	//res.status(200).send(req.rootUser);
})
//! PROFILE
router.get('/profile',(req,res) => {
 // res.send('profile');
  //console.log(req.rootUser);
  //res.status(200).send(req.rootUser);
})
router.post('/updateprofile',authUser,async (req,res) => {
  const { name, phone, email } = req.body;
  const _id = req.rootUser._id;
  console.log(_id);

  if(!name || !phone || !email){
    console.log("please fill ");
  }
  else{
    try{
      const result = await User.findByIdAndUpdate({_id},{
         $set:{
            name: name,
            phone: phone,
            email: email
         }
      },{
            new: true,
            useFindAndModify: false      
      });
      //console.log(result);
      res.status(200).json({message: "updated succesful"})
    }catch(err){
      console.log(err);
    }
  }
})

//! CONTACT
router.post('/contact',authUser, async (req,res) => {
  // console.log(req);
  //console.log(req.body);
  try{
    const { name, email, message } = req.body;
    if(!name || !email || !message){
      //return res.json({error: "please fill"})
    }

    const user = await User.findOne({_id: req.userID})

    if(user){
      const userMsg = await user.addMsg(name,email,message);
      console.log("userMsg");
      await user.save();
      res.status(201).json({ message: "user Contact successfull" })
    }
  } catch(err){
    console.log(err);
  }
})
//!  SIGNUP
router.post('/signup',async (req,res) => {  
  const { name, email, phone, pass } = req.body;

  if(!name || !email || !phone || !pass){
    return res.status(422).json({ error:" please fill all data !" })
  }
  try{
    const userExist = await User.findOne({email: email});
      
    if(userExist){
      return res.status(422).json("Email already exist");
    } 
    const user = new User(req.body);
    const userReg = await user.save();
      
    if(userReg){
      return res.status(201).json({message: "User Registered Successfuly"})
    }
    else{
      return res.status(422).json({message: "Registration not Successfull"})
    }  
  }catch(err){
    console.log(err)
  }
})
//! SIGNIN
router.post('/signin',async (req,res) => {
  try{
    const { email,pass } = req.body;
    if(!email || !pass){
      return res.json("please fill both");
    }

    const emailExist = await User.findOne({email: email});

    if(emailExist){
      console.log("email exits..");
      const isMatch = await bcrypt.compare(pass, emailExist.pass);
      if(isMatch){
        console.log("password matched..");
        const token = await emailExist.generateAuthToken();
       // console.log(token);

        res.cookie('jwt',token,{
          expires: new Date(Date.now() + 86400000),
          httpOnly: true
        })

        res.json({message: "User Login Successfull"})
      } else{
        res.status(400).json({message: "Email or password don't matched..!!"})
      } 
    } else{
      res.status(400).json({message: "Email not exits"})
    }
  } catch(err){
    console.log(err);
  }
})

router.get('/getuserdata',authUser,(req,res) => {
  // res.send('profile');
   //console.log(req.rootUser);
   res.status(200).send(req.rootUser);
})
router.post('/checkpass',authUser,async(req,res) => {
  console.log("checkpass...");
 // console.log(req.rootUser);
  console.log(req.rootUser.pass);

  const { password } = req.body;
  console.log("password");
  console.log(password);
  const isMatch = await bcrypt.compare( password, req.rootUser.pass);
  console.log(isMatch);
  if(isMatch){
    res.status(201).send({message: "password match"});
  }
  else{
    res.status(400).send({message: "password not match"});
  }
  //res.status(201).send(req.rootUser);
})
router.post('/updatepass', authUser, async (req,res) => {
  const _id = req.rootUser._id;
  console.log(req.body.newPass);
  if(req.body.newPass){
    const pass = await bcrypt.hash(req.body.newPass, 10);
    try{
      const result = await User.findByIdAndUpdate({_id},{
         $set:{
            pass: pass,       
         }
      },{
          new: true,
          useFindAndModify: false      
      });
      //console.log(result);
      res.status(200).json({message: "updated succesful"})
    }catch(err){
      console.log(err);
      res.status(400).json({message: "unable to update"})
    }
  }
  else{
    res.status(401).json({message: "please provide a password"})
  }
})
router.get('/logout',(req,res) => {
  res.clearCookie('jwt',{ path: '/'});
  res.status(200).send('user logout');
})
module.exports = router;