import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan!" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: "Password Salah!" });
  req.session.userId = user.id;
  const id = user.id;
  const nama = user.nama;
  const username = user.username;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ id, nama, username, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login ke Akun Anda!" });
  }
  const user = await User.findOne({
    attributes: ["id", "nama", "username", "email", "no_telp", "stasiunId", "role"],
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan!" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak Dapat Logout!" });
    res.status(200).json({ msg: "Anda Berhasil Logout" });
  });
};
