const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/superAdminModel");
const Admin = require("../models/adminModel");

const router = express.Router();

// Super Admin Registration
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingSuperAdmin = await SuperAdmin.findOne({ email });
        if (existingSuperAdmin) return res.status(400).json({ message: "Super Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newSuperAdmin = new SuperAdmin({ name, email, password: hashedPassword });
        await newSuperAdmin.save();

        res.status(201).json({ message: "Admin registered successfully", superAdmin: newSuperAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Super Admin Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const superAdmin = await SuperAdmin.findOne({ email });
        if (!superAdmin) return res.status(404).json({ message: "Super Admin not found" });

        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: superAdmin._id }, "JWT_SECRET:", process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get all Admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); 
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create Admin (Super Admin)
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully", Admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//search admin
const searchAdmin=async(req,res)=>{
    try {
    const {name} = req.query;
    if (!name) {
        return res.status(400).json({ message: "Please provide an admin name to search." });
    }
    const admins = await Admin.find({
           name: { $regex: name, $options: "i" } 
    });

    if (!admins.length) {
        return res.status(404).json({ message: "No matching admins found." });
    }

    res.status(200).json({ admins });
} catch (error) {
    res.status(500).json({ error: "Failed to filter admins" });
}
};


// Delete Admin
const deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deletedAdmin) return res.status(404).json({ message: 'Admin not found' });

        res.status(200).json({message: 'Admin removed successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({  message: 'Error removing admin' });
    }
};

module.exports = { register, login, createAdmin,getAllAdmins,deleteAdmin,searchAdmin};