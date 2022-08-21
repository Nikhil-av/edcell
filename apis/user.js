const exp = require('express')
const userApi = exp.Router();
userApi.use(exp.json())
const expressErrorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
module.exports =userApi;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
  auth: {
    user: 'EDCELL-VNRVJIET@outlook.com',
    pass: 'ananyaEDcell'
  },

}));


userApi.post("/create", expressErrorHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")
    let userCollectionObj2 = req.app.get("userCollectionObj2")
    let newuser=req.body;
    let checkuser = await userCollectionObj2.findOne({ username: newuser.username })
    // //if user existed
    if (checkuser !== null) {
        res.send({ message: "User already existed" });
    }
    checkuser = await userCollectionObj2.findOne({ email: newuser.email });
    // //if user existed
    console.log(newuser);
    if (checkuser !== null) {
        res.send({ message: "email already existed" });
    }
    eee=newuser.email
    let otp=Math.random()*10000
    otp=otp | 0
    otp=otp.toString()
    //get user obj
    var mailOptions = {
        from: 'EDCELL-VNRVJIET@outlook.com',
        to: newuser.email,
        subject: 'Sending Email using Node.js[nodemailer]',
        text: otp,
      };
      console.log(newuser.email);
      let hashedPassword =await bcryptjs.hash(newuser.password, 6)
      console.log('hello2')
      //replace password
      newuser.password = hashedPassword;
      newuser.otp=otp;
      console.log(otp)
      let signedToken = jwt.sign({ username: newuser.username }, 'abcdef', { expiresIn: 300 })
      newuser.signedToken=signedToken;
      let otpuser = await userCollectionObj.findOne({ username: newuser.username })
      // //if user existed
      if (otpuser !== null) {
        await userCollectionObj.deleteOne({ username: newuser.username })
      }
      otpuser = await userCollectionObj.findOne({ email: newuser.email })
      // //if user existed
      if (otpuser !== null) {
        await userCollectionObj.deleteOne({ email: newuser.email  })
      }
      await userCollectionObj.insertOne(newuser)
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error.message);
    res.send({ message: error.message })
        } else {
          console.log('Email sent: ' + info.response);

          res.send({ message:"otp sent"})
        }
      });  
    
}))


userApi.post("/verifyotp", expressErrorHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")
    let userCollectionObj2 = req.app.get("userCollectionObj2")
    let newuser=req.body;
    let checkuser = await userCollectionObj.findOne({ username: newuser.username });
    if(checkuser.otp!=newuser.otp) {
        res.send({message: "invalid otp"})
    }
    else{
        await userCollectionObj2.insertOne(checkuser)
        res.send({message: "user created"})
    }
 
}))





userApi.post('/login', expressErrorHandler(async (req, res) => {
    let userCollectionObj2 = req.app.get("userCollectionObj2")

    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj2.findOne({ username: credentials.username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            //send token to client
            res.send({ message: "login success",  username: credentials.username, userObj: user })
        }

    }

}))
module.exports =userApi