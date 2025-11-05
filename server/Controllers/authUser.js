
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")
const Basket = require("../Models/BasketModel")

const register = async (req, res) => {
    const { password, phone, email, userName, name, role } = req.body
    if (!name || !userName || !password || !phone || !email)
        return res.status(400).json({ "massage": "misiing field" })
    const user = await User.findOne({ userName }).lean()

    if (user)
        return res.status(409).json({ "massage": "duplicate name" })
    const hashPassword = await bcrypt.hash(password, 10)
    const basket =await Basket.create({})
    const newUser = await User.create({ name, userName, phone, email, password: hashPassword, role, basket: basket._id })
    res.json(newUser)
}
const login = async (req, res) => {
    const { userName, password } = req.body

    if (!userName || !password)
        res.status(404).send("misiing field")
    const user = await User.findOne({ userName }).lean()
    if (!user)
        return res.status(404).send("user or password are not correct")

    if (! await bcrypt.compare(password, user.password))
        return res.status(404).send("user or password are not correct")
    const userInfo = { _id: user._id, name: user.name, email: user.email, role: user.role, userName: user.userName, basket: user.basket }
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json(token)
}
module.exports = { login, register }