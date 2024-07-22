import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const passwordHashed = await bcrypt.hash(password, 14);
    const newUser = new User({
      username,
      email,
      password: passwordHashed,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = (req, res) => res.send("login");

// export const profile = (req, res) => {
//     const { user } = req;
//     res.send(user);
// };
