const jwt = require("jsonwebtoken")
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).send("unauthorised")
    }
    const token = authHeader.split(' ')[1]
    // console.log(token)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err)
            return res.status(403).send("forbidden")
        req.user = decode
        next()
    })
}
const verifyAdminJWT = (req, res, next) => {
    const userRole = req.user.role
    if (userRole === "admin")
        next()
    return res.status(403).send("admin only allow")
}
module.exports = { verifyJWT, verifyAdminJWT }