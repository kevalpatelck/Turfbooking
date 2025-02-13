const express = require("express");
const { getTurfsByLocation, getAllTurfs,createBooking,getTurfById,searchTurfs} = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/turfs", getTurfsByLocation);
router.get("/turfs/:id", getTurfById);

router.get("/getallturfs", getAllTurfs);
router.post("/booking", createBooking);
router.get("/searchTurfs", searchTurfs);


module.exports = router;
