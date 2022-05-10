import express from "express";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import helper from "../utils/jwtissuer.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "no users" });
  }
});
router.get("/checkUsername/:username", async (req, res) => {
  try {
    console.log(req.params.username);
    const checkUser = await User.findOne({ username: req.params.username });
    if (!checkUser) {
      return res.status(409).json({ message: "username not available" });
    }
    return res.status(200).json({ message: "username available" });
  } catch (error) {
    console.log("error", error);
  }
});
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  const checkUser = await User.findOne({ username: req.body.username });
  const checkEmail = await User.findOne({ username: req.body.email });

  if (checkUser !== null)
    return res
      .status(409)
      .json({ message: "username already in use" });
  if (checkEmail !== null)
    return res
      .status(409)
      .json({ message: "email already in use", email: checkEmail });

  const { username, firstname, lastname, email } = req.body;

  try {
    const userToAdd = await User.create({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      hash: hashedPassword,
    });
    return res
      .status(200)
      .json({ message: "user registered successfully", created: userToAdd });
  } catch (error) {
    return res.status(400).json({ message: "Error happened", error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
   

    const { username, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "please supply password" });
    }

    const user = await User.findOne({ username: username });

    if (!user) return res.status(400).json({ message: "user not found" });

    const isCorrect = await bcrypt.compare(password, user.hash);

    if (!isCorrect)
      return res.status(400).json({ message: "password is wrong" });
    const token = await helper.generateJWTToken(user);
    return res.status(200).json({ message: "password is right", token: token });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ message: error.toString() });
  }
});
export default router;
