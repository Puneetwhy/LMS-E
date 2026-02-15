
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");

        const adminExist = await User.findOne({ email: "admin@example.com" });
        if (adminExist) {
            console.log("Admin already exists");
            process.exit();
        }

        const admin = await User.create({
            fullName: "Admin User",
            email: "admin@example.com",
            password: "Admin@1234", 
            role: "ADMIN",
            avatar: {
                public_id: "default_admin",
                secure_url: "https://img.freepik.com/premium-vector/admin-avatar-icon_128117-3803.jpg?w=360"
            }
        });

        console.log("Admin created successfully");
        process.exit();

    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
}

createAdmin();
