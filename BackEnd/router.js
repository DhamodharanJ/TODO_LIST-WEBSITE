import express from 'express';
import todoModel from './Models/TodoModel.js';
import users from './Models/LoginModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import  { config }   from 'dotenv'
config()





const router = express.Router()
// token checking method
const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
        return res.status(400).json("Token not available");
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // req. ??? we  can set any name after  the req
        // decode.??? what value you ecrypt while creating a token ,that only use
        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(400).json("Invalid token");
    }
};

//getusername
router.get('/get-username', verifyUser ,async (req,res)=>{
    const data=await users.findOne({username:req.username});
    res.status(200).send(data.username);
})

//log out cookies
router.get('/user-logout',async(req,res)=>{
    res.clearCookie('token');
    res.send("logged out and cookie cleared");
    
})

router.post('/set-data', verifyUser, async (req, res) => {
    const { list } = req.body
    if (!list) {   
        return res.status(400).json('no data found');
    }
    try {
        const postData = { list, owner: req.username }
        const data = await todoModel.create(postData);
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});


router.put('/update-data/:id', verifyUser, async (req, res) => {
    const { list } = req.body
    try {
        const data = await todoModel.findByIdAndUpdate(req.params.id, {
            $set: {
                list,
            }
        }, { new: true });
        res.send(data)
    }
    catch (error) {
        res.send(error)
    }
})


router.get('/get-data', verifyUser, async (req, res) => {
    try {
        const data = await todoModel.find({ owner: req.username });
        res.status(200).json({ data: data })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/delete-data/:id', verifyUser, async (req, res) => {
    try {
        const data = await todoModel.findByIdAndDelete(req.params.id)
        res.send("deleted Successfully")
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/post-userdata', async (req, res) => {
    // console.log('called')
    const { username, password } = req.body;
    try {
        const existUser = await users.findOne({ username })
        if (existUser) {
            return res.status(400).send("UserName Already exist")
        }
        const hashpass = await bcrypt.hash(password, 10)
        const data = await users.create({ username, password: hashpass })
        const token = jwt.sign({ username }, process.env.JWT_SECRET , { expiresIn: "1d" });
        // console.log(token)
        return res.status(200).json({token:token,message:"Signup Successful"});
    } catch (error) {
        return res.status(400).send(error)
    }
})

//token creation method
router.post('/post-login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send("Invalid Input");
    }
    try {
        const data = await users.findOne({ username })
        if (!data) {
            return res.status(400).send("Account not found");
        }
        const passcheck = await bcrypt.compare(password, data.password)

        if (passcheck) {
            const token = jwt.sign({ username }, process.env.JWT_SECRET , { expiresIn: "1d" });
        //     res.cookie('token', token, { 
        //         maxAge: 900000, 
        //         httpOnly: true ,
        //         secure: true,
        //         sameSite: 'Lax'
        // });
            // console.log(token)
            return res.status(200).json({token:token,message:"Login Successful"});
            
        } else {
            return res.status(400).send("Incorrect Password");
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})




export default router