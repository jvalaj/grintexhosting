import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helper/authHelper.js"
import JWT from "jsonwebtoken"
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //validation
        if (!email) {
            return res.send({
                error: "Name is required"
            })
        }
        if (!password) {
            return res.send({
                error: "Name is required"
            })
        }

        //existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered. Please Login!"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
        }).save()

        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}


//login controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        //token creation
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: "login successful",
            user: {
                name: user.name,
                email: user.email,

            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

//test
export const userController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email })
        res.status(200).send({
            success: true,
            message: "login successful",
            user: {
                name: user.name,
                email: user.email,

            },
        })
    } catch (error) {
        console.log(first)

    }
}
