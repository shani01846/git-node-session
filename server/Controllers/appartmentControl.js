const Appartment = require("../Models/appartmentModel");

// הוספת דירה
const addAppartment = async (req, res) => {
  const { name, size, price, beds, description,city,img } = req.body;

  if (!size || !price || !beds)
    return res.status(400).send("missing field");

  await Appartment.create({ name, size, price, beds, description,city,img });
  res.send("appartment added successfully!");
};

// קבלת כל הדירות
const getAllAppartments = async (req, res) => {
  const appartmentList = await Appartment.find().lean()
  res.json(appartmentList);
};

// עדכון דירה
const updateAppartment = async (req, res) => {
  const { id } = req.params;
  const { name, size, price, beds, description,city,img } = req.body;

  if (!id)
    return res.status(400).send("id is required");

  const app = await Appartment.findById(id).exec()

  if (!app)
    return res.status(404).send("appartment not found");

  app.name = name;
  app.size = size;
  app.price = price;
  app.beds = beds;
  app.description = description;
  app.city = city
  app.img = img

  await app.save();
  res.send("appartment updated successfully!");
};

// קבלת דירה לפי מזהה
const getAppartment = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).send("id is required");

  const appartment = await Appartment.findById(id).lean();

  if (!appartment)
    return res.status(404).send("id is incorrect");

  res.json(appartment);
};

// הוספת תגובה
const addComment = async (req, res) => {
  const { comment, id } = req.body;

  if (!comment || !id)
    return res.status(400).send("missing field");

  const appartment = await Appartment.findById(id).exec()

  if (!appartment)
    return res.status(404).send("appartment not found");

  appartment.comments.push(comment);
  const updatedAppartment = await appartment.save();

  res.json(updatedAppartment);
};

// מחיקת דירה
const deleteAppartment = async (req, res) => {
  const {id} = req.params;

  if (!id)
    return res.status(400).send("missing field");

  const appartment = await Appartment.findById(id).exec()

  if (!appartment)
    return res.status(404).send("appartment not found");

  const result = await Appartment.deleteOne({ _id: id });

  res.json(result);
};

// בדיקת זמינות
const checkAvailable = async (req, res) => {
  const { id, sDate, eDate } = req.body;
console.log( id, sDate, eDate );

  if (!id || !sDate || !eDate)
    return res.status(400).send("missing fields");

  const appartment = await Appartment.findById(id).lean();

  if (!appartment)
    return res.status(404).send("appartment not found");

  const sd = new Date(sDate);
  const ed = new Date(eDate);
  let available = true;

  appartment.bookings.forEach((b) => {
    if (!(ed < b.sDate || sd > b.eDate)) {
      available = false;
    }
  });

  if (!available)
    return res.send(false);

  res.send(true);
};

// הוספת הזמנה
const addBooking = async (req, res) => {
  const { id, sDate, eDate } = req.body;

  if (!id || !sDate || !eDate)
    return res.status(400).send("missing fields");

  const appartment = await Appartment.findById(id).exec()

  if (!appartment)
    return res.status(404).send("appartment not found");

  appartment.bookings.push({ sDate, eDate });
  const updatedAppartment = await appartment.save();

  res.json(updatedAppartment);
};

module.exports = {
  getAllAppartments,
  getAppartment,
  addAppartment,
  addComment,
  deleteAppartment,
  updateAppartment,
  addBooking,
  checkAvailable,
};
