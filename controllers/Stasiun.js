// import Stasiun from "../models/GrupModel.js";
import User from "../models/UserModel.js";
import Stasiun from "../models/StasiunModel.js";

// import { Op } from "sequelize";

export const getStasiuns = async (req, res) => {
  try {
    const response = await Stasiun.findAll({
      attributes: ["id", "kode_stasiun", "nama_stasiun"],
      include: [
        {
          model: User,
          attributes: ["nama", "email"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getStasiunsById = async (req, res) => {
  try {
    const stasiuns = await Stasiun.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!stasiuns) return res.status(404).json({ msg: "data tidak ditemukan" });
    let response;
    if (req.role != "admin" && req.role != "super_admin") {
      response = await Stasiun.findOne({
        attributes: ["kode_stasiun", "nama_stasiun"],
        where: {
          id: stasiuns.id,
        },
        include: [
          {
            model: User,
            attributes: ["nama", "email"],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createStasiuns = async (req, res) => {
  const { kode_stasiun, nama_stasiun } = req.body;
  try {
    await Stasiun.create({
      kode_stasiun: kode_stasiun,
      nama_stasiun: nama_stasiun,
    });
    res.status(201).json({ msg: "Stasiun Berhasil di buat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateStasiuns = async (req, res) => {
  try {
    const stasiuns = await Stasiun.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!stasiuns) return res.status(404).json({ msg: "data tidak ditemukan" });
    const { kode_stasiun, nama_stasiun } = req.body;

    if ((req.role === "admin", "super_admin")) {
      await Stasiun.update(
        { kode_stasiun, nama_stasiun },
        {
          where: {
            id: stasiuns.id,
          },
        },
      );
    }
    res.status(200).json({ msg: "Stasiun Berhasil Di Update!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteStasiuns = async (req, res) => {
  try {
    const stasiuns = await Stasiun.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!stasiuns) return res.status(404).json({ msg: "data tidak ditemukan" });

    if ((req.role === "admin", "super_admin")) {
      await Stasiun.destroy({
        where: {
          id: stasiuns.id,
        },
      });
      // } else {
      //   if (req.userId !== stasiuns.userId) return res.status(203).json({ msg: "Akses Terlarang!" });
      //   await Stasiun.destroy({
      //     where: {
      //       [Op.and]: [{ id: stasiuns.id }, { userId: req.userId }],
      //     },
      //   });
    }
    res.status(200).json({ msg: "Stasiun Berhasil Di Hapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
