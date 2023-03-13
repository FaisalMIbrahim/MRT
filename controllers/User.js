import Stasiuns from "../models/StasiunModel.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "nama", "username", "email", "no_telp", "stasiunId", "role"],
      include: [
        {
          model: Stasiuns,
          attributes: ["nama_stasiun"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res(500).json({ msg: error.message });
  }
};
export const getUsersById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["id", "nama", "username", "email", "no_telp", "stasiunId", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createUsers = async (req, res) => {
  const { nama, username, password, confPassword, email, no_telp, role, stasiunsId } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      nama: nama,
      username: username,
      password: hashPassword,
      email: email,
      no_telp: no_telp,
      stasiunId: stasiunsId,
      role: role,
    });
    res.json({ msg: "User Berhasil Dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const registerUser = async (req, res) => {
  const { nama, username, password, confPassword, email, no_telp } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      nama: nama,
      username: username,
      password: hashPassword,
      email: email,
      no_telp: no_telp,
      stasiunId: null,
      role: "user",
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateUsers = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  const { nama, username, password, confPassword, email, no_telp, stasiunId, role } = req.body;

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  try {
    await User.update(
      {
        nama: nama,
        username: username,
        password: hashPassword,
        email: email,
        no_telp: no_telp,
        stasiunId: stasiunId,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    res.status(200).json({ msg: "User Berhasil Diupdate!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateProfileUsers = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  const { nama, username, password, confPassword, email, no_telp, stasiunId, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  if (role === "" || role === null) {
    role = user.role;
  }
  try {
    await User.update(
      {
        nama: nama,
        username: username,
        password: hashPassword,
        email: email,
        no_telp: no_telp,
        stasiunId: stasiunId,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    res.status(200).json({ msg: "Data Berhasil Diupdate!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteUsers = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Berhasil DiHapus!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
