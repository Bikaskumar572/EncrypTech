const express = require('express');
const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const { register } = require('module');

const app = express();

// Load environment variables from config.env
dotenv.config({ path: 'config.env' });

// MongoDB connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected");
}).catch((error) =>{
    console.log(error)
})

const secretKey = process.env.SECRET_KEY;

// Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String,
    pincode: String,
    email: {type:String, unique:true},
    dob: Date,
    phoneNumber: String,
    aadharNo: String,
    panCardNo: String,
    bankName: String,
    accountNo: String,
    ifscCode: String,
    password: String
});

// Define a model
const UserModel = mongoose.model('User', UserSchema);

// Middleware for JSON parsing
app.use(bodyParser.json());

app.use(express.static('public'));

// Middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/userdata.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'userdata.html'));
});

// Register user
app.post('/register', async (req, res) => {
    const user = req.body;

    // Encrypt sensitive data
    user.phoneNumber = CryptoJS.AES.encrypt(user.phoneNumber, 'secretKey').toString();
    user.aadharNo = CryptoJS.AES.encrypt(user.aadharNo, 'secretKey').toString();
    user.panCardNo = CryptoJS.AES.encrypt(user.panCardNo, 'secretKey').toString();
    user.accountNo = CryptoJS.AES.encrypt(user.accountNo, 'secretKey').toString();
    user.ifscCode = CryptoJS.AES.encrypt(user.ifscCode, 'secretKey').toString();
    user.password = CryptoJS.AES.encrypt(user.password, 'secretKey').toString();

    const doc = new UserModel(user);

    await doc.save();

    res.send('User registered successfully');
});

// Fetch user data
app.get('/user/:id', async (req, res) => {
    // Check if the authenticated user's ID matches the requested user's ID
    // if (req.user.id !== req.params.id) {
    //     return res.sendStatus(403);
    // }

    const doc = await UserModel.findById(req.params.id);
    
    // Decrypt sensitive data
    doc.phoneNumber = CryptoJS.AES.decrypt(doc.phoneNumber, 'secretKey').toString(CryptoJS.enc.Utf8);
    doc.aadharNo = CryptoJS.AES.decrypt(doc.aadharNo, 'secretKey').toString(CryptoJS.enc.Utf8);
    doc.panCardNo = CryptoJS.AES.decrypt(doc.panCardNo, 'secretKey').toString(CryptoJS.enc.Utf8);
    doc.accountNo = CryptoJS.AES.decrypt(doc.accountNo, 'secretKey').toString(CryptoJS.enc.Utf8);
    doc.ifscCode = CryptoJS.AES.decrypt(doc.ifscCode, 'secretKey').toString(CryptoJS.enc.Utf8);
    doc.password = CryptoJS.AES.decrypt(doc.password, 'secretKey').toString(CryptoJS.enc.Utf8);

    res.send(doc);
});

//login
app.post('/login', async (req, res) => {
    // Get the username and password
    const { email, password } = req.body;
  
    // Authenticate the user
    const user = await UserModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // Create a token that contains the user's ID
    const token = jwt.sign({ id: user._id }, 'secret key'); // Replace 'secret key' with your actual secret key
  
    // Send the token to the frontend
    res.json({ token });
  });

  //for updating user data
  app.put('/api/user/:id', (req, res) =>{
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;

    userData = {
        ...userData,
        ...updatedUserData
    };

    res.json({message: 'User data updated successfully'});
  })
  

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
});
