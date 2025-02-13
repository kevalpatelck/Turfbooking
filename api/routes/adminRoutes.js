const express = require('express');
const router = express.Router();
const { login, addTurf,getAllTurfsByAdmin,getAdminTurfs,getTurfById,totalTurfs ,searchTurfs,totalBookings,updateTurf, deleteTurf,getAllBookings,getBookingsForAdminTurf} = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");
const upload=require("../middleware/multer")

router.post('/login', login);

router.post('/add-turf', auth,upload.single("image"), addTurf);
router.get('/my-turfs',auth, getAllTurfsByAdmin);
router.put('/update-turf/:id',auth, upload.single('image'), updateTurf);
router.delete('/:id', auth, deleteTurf);
router.get('/get-bookings', auth, getAllBookings);
router.get('/totalTurfs', auth, totalTurfs);
router.get('/totalBookings', auth, totalBookings);
router.get('/searchTurfs', auth, searchTurfs);


module.exports = router;

