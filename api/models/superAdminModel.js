const mongoose = require("mongoose");

const SuperAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
    

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);
module.exports = SuperAdmin;

SuperAdminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});