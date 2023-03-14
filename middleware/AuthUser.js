import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login ke Akun Anda!" });
  }
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  req.userId = user.id;
  req.role = user.role;
  next();
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan" });
  if (user.role != "admin" && user.role != "super_admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  // if (user.role !== "admin") return res.status(403).json({ msg: "Akses terlarang" });
  // if (user.role !== "super_admin") return res.status(403).json({ msg: "Akses terlarang" });
  next();
};