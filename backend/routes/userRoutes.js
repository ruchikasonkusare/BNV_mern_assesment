const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
  exportToCSV,
  toggleStatus
} = require("../controllers/userController");



router.patch("/:id/status", toggleStatus);

router.get("/export", exportToCSV);
router.get("/search", searchUsers);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);        // ✅ plain JSON now
router.put("/:id", updateUser);      // ✅ plain JSON now
router.delete("/:id", deleteUser);

module.exports = router;