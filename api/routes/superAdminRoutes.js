const express = require('express');
const router = express.Router();
const { register,login,createAdmin,getAllAdmins, deleteAdmin,searchAdmin } = require("../controllers/superAdminController");
const auth = require("../middleware/authMiddleware");

router.post('/register', register);
router.post('/login', login);
router.get('/getall-admin', getAllAdmins);

// for admin
router.post('/create-admin',createAdmin);
router.delete('/:id',deleteAdmin)
router.get('/search-admin', searchAdmin);


module.exports = router;
