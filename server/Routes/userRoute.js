const express = require("express")
const router = express.Router()
const {adddItemToBasket,deleteItem,getAllItems,deleteBasket}= require("../Controllers/userControl")
const {verifyJWT,verifyAdminJWT} = require("../middleware/verifyJWT")

router.put("/",verifyJWT,adddItemToBasket)
router.delete("/",verifyJWT,deleteItem)
router.get("/",verifyJWT,getAllItems)
router.delete("/deleteBasket",verifyJWT,deleteBasket)

module.exports = router