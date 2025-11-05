const express = require("express")
const router  = express.Router()
const{getAppartment,addAppartment,addComment,deleteAppartment,updateAppartment,addBooking,checkAvailable,getAllAppartments} =require("../Controllers/appartmentControl")
const {verifyJWT,verifyAdminJWT} = require("../middleware/verifyJWT")
router.get("/appartmentList",getAllAppartments)
router.post("/",verifyJWT,verifyAdminJWT,addAppartment)
router.get("/:id",verifyJWT,getAppartment)
router.put("/addComment",verifyJWT,addComment)
router.delete("/:id",verifyJWT,verifyAdminJWT,deleteAppartment)
router.put("/update/:id",verifyJWT,verifyAdminJWT,updateAppartment)
router.put("/addBook",verifyJWT,addBooking)
router.post("/checkAvailable",verifyJWT,checkAvailable)

module.exports = router