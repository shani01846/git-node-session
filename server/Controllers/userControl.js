const Basket = require("../Models/BasketModel");
const User = require("../Models/userModel")



const getUser = async (req, res) => {
    const { userName, password } = req.query
    if (!userName || !password)
        return res.status(400).send("user name or password are required")
    console.log(userName);

    const user = await User.findOne({ userName: userName }).lean()

    if (!user)
        return res.status(404).send("user name or password is incorrect")
    res.json(user)
}

const adddItemToBasket = async (req, res) => {
    const { item } = req.body
    if (!item)
        return res.status(400).send("missing field")
    const basket = await Basket.findById(req.user.basket).exec()
    console.log(basket);
    basket.items.push(item)
    const resalt = await basket.save()
    res.json(resalt)
}

const deleteItem = async (req, res) => {
    const { itemId } = req.body
    if (!itemId)
        return res.status(400).send("missing field")
    const user = await User.findById(req.user._id).populate('basket').exec()
    const updateUser = await Basket.updateOne(
        { _id: req.user.basket }, { $pull: { items: { _id: itemId } } }
    )
    user.name="lkjh",
    res.json(updateUser)
}
const deleteBasket = async (req, res) => {
    const user = await User.findById(req.user._id).populate('basket').exec()
    const updateUser = await Basket.updateOne(
        { _id: req.user.basket }, { items: [] }
    )
    res.json(updateUser)
}
// const getAllItems = async (req, res) => {
// // console.log("getaaaaaaaaaaaaaaaallbasket");
// //     const user = await User.findById(req.user._id).populate('basket').lean()
// //     console.log({user});
// //     const basket = user
// //    // console.log({basket});
// //     res.json(basket)
// try {
//     const user = await User.findById(req.user._id)
//         .populate({
//             path: 'basket', // Populate the basket field
//             populate: {
//                 path: 'items.idAppartment', // Populate the idAppartment field in items
//                 model: 'Appartment' // Specify the model to populate
//             }
//         });
// console.log(user);
//     return    res.json(user);
// } catch (error) {
//     console.error("Error fetching user with basket:", error);
//     throw error;
// }
// }
const getAllItems = async (req, res) => {
    // Fetch the user and populate the basket with items and their apartment details
    const {basket} = await User.findById(req.user._id)
        .populate({
            path: 'basket',
            populate: {
                path: 'items.idAppartment',
                // model: 'Appartment'
            }
        }).lean(); // .lean() for a plain JavaScript object


    return res.json(basket); // Send back the user data as JSON

};
module.exports = { getUser, adddItemToBasket, deleteItem, getAllItems, deleteBasket }