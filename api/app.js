const express = require("express");
const cors=require("cors")
const port = process.env.PORT || 3000;
const db = require("./db/conn");
const superAdminRoutes = require("./routes/superAdminRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path")

const env = require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/superAdmin', superAdminRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running at ${port} no.`);
});
