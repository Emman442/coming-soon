const catchAsync = require("../utils/catchAsync");
const  WaitList = require("../models/waitListModel");
exports.signup = async (req, res) => {
  const users = await WaitList.find();
  const lastUser = await WaitList.findOne().sort({ createdAt: -1 });
  try{
    res.status(200).render("join", { users: users.length, title: "Join the WaitList Now!", user: lastUser});
  }catch(error){
    console.log(error)
  }
};
exports.index = async (req, res) => {
  try {
    res.status(200).render("about");
  } catch (error) {
    console.log(error);
  }
};
exports.getOverview = async (req, res) => {
  const users = await WaitList.find();
  try{
    // res.status(200).render("about", { users: users.length, title: "join the Communities" });
    res.status(200).render("index", { users: users.length, title: "join the Communities" })
  }catch(error){
    console.log(error)
  }
};
