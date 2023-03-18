import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

// USER REGISTRATION
export const register=async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        }=req.body

        // const salt=await bcrypt.genSalt();
        const passHash= await bcrypt.hash(
            password,
            await bcrypt.genSalt()
        );

        const newUser=new User({
            firstName,
            lastName,
            email,
            password: passHash,
            picturePath,
            friends,
            location,
            occupation,
            // dummy values for views and impression because im lazy
            viewedProfile: Math.floor(Math.random()*1000),
            impressions: Math.floor(Math.random()*1000)
        });

        const savedUser=newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
}

// LOGIN
export const login=async (req,res) => {
    try {
        const { email, password }=req.body;
        const user=await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist." });
        }
        const isSame=await bcrypt.compare(password, user.password);
        if (!isSame) {
            return res.status(400).json({ message: "Wrong email or password." });
        }
        const token=jwt.sign({id:user._id}, process.env.JWT_PRIVATE_KEY);
        delete user.password;       //JUST FOR SAFETY
        return res.status(200).json({ token, user });
    } catch(err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }
}