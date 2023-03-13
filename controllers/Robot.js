
import User from "../models/UserModel.js";
import Robot from "../models/RobotModel.js";

import { Op } from "sequelize";

export const getRobots = async (req, res) => {
  try {
    let response;
    if ((req.role === "admin", "super_admin")) {
      response = await Robot.findAll({
        attributes: [
          "id",
          "id_robot",
          "video_uri",
          "status",
          "in_use",
          "station",
          "system_state",
          "inverter_state",
          "emergency_state",
          "state_modified_by",
        ],
        // include: [
        //   {
        //     model: User,
        //     attributes: ["nama", "email"],
        //   },
        // ],
      });
      // } else {
      //   response = await Robot.findAll({
      //     attributes: ["kode_stasiun","name_stasiun"],

      //     include: [
      //       {
      //         model: User,
      //         attributes: ["name", "email"],
      //       },
      //     ],
      //   });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getRobotsById = async (req, res) => {
  try {
    const robots = await Robot.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!robots) return res.status(404).json({ msg: "data tidak ditemukan" });
    let response;
    if ((req.role === "admin", "super_admin")) {
      response = await Robot.findOne({
        attributes: [
          "id",
          "id_robot",
          "video_uri",
          "status",
          "in_use",
          "station",
          "system_state",
          "inverter_state",
          "emergency_state",
          "state_modified_by",
        ],
        where: {
          id: robots.id,
        },
        // include: [
        //   {
        //     model: User,
        //     attributes: ["nama", "email"],
        //   },
        // ],
      });
      // } else {
      //   response = await Robot.findOne({
      //     attributes: ["kode_stasiun", "name_stasiun"],
      //     where: {
      //       [Op.and]: [{ id: Robots.id }, { userId: req.userId }],
      //     },
      //     include: [
      //       {
      //         model: User,
      //         attributes: ["name", "email"],
      //       },
      //     ],
      //   });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createRobots = async (req, res) => {
  const {
    id_robot,
    status,
    in_use,
    station,
    system_state,
    inverter_state,
    emergency_state,
    state_modified_by,
    last_modified_time,
  } = req.body;
  try {
    await Robot.create({
      id_robot: id_robot,
      video_uri: null,
      status: status,
      in_use: in_use,
      station: station,
      system_state: system_state,
      inverter_state: inverter_state,
      emergency_state: emergency_state,
      state_modified_by: state_modified_by,
      last_modified_time: null,
    });
    res.status(201).json({ msg: "Robot Berhasil di buat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateRobots = async (req, res) => {
  try {
    const robots = await Robot.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!robots) return res.status(404).json({ msg: "data tidak ditemukan" });
    const {
      id_robot,
      status,
      in_use,
      station,
      system_state,
      inverter_state,
      emergency_state,
      state_modified_by,
    } = req.body;

    if ((req.role === "admin", "super_admin")) {
      await Robot.update(
        {
          id_robot,
          status,
          in_use,
          station,
          system_state,
          inverter_state,
          emergency_state,
          state_modified_by,
        },
        {
          where: {
            id: robots.id,
          },
        },
      );
    }
    res.status(200).json({ msg: "Robot Berhasil Di Update!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const deleteRobots = async (req, res) => {
  try {
    const robots = await Robot.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!robots) return res.status(404).json({ msg: "data tidak ditemukan" });

    if ((req.role === "admin", "super_admin")) {
      await Robot.destroy({
        where: {
          id: robots.id,
        },
      });
      // } else {
      //   if (req.userId !== Robots.userId) return res.status(203).json({ msg: "Akses Terlarang!" });
      //   await Robot.destroy({
      //     where: {
      //       [Op.and]: [{ id: Robots.id }, { userId: req.userId }],
      //     },
      //   });
    }
    res.status(200).json({ msg: "Robot Berhasil Di Hapus!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateInuse = async (req, res) => {
  
  try {
    const robots = await Robot.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!robots) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { in_use } = req.body;

    // if (in_use === "No") {
      await Robot.update(
        { in_use: robots.in_use == 'Yes' ? 'No' : 'Yes'},
        {
          where: {
            id: robots.id,
          },
        },
      );
    // return res.send(200, { message: robots });
    res.status(200).json({ msg: "In Use berhasil diupdate!", in_use: in_use });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};