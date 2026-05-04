import sendEmail from '../utils/sendEmail.js';
import appError from '../utils/error.util.js';
import User from "../models/user.model.js";   // ← Important: Import User Model

// Contact Us
export const contactUs = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return next(new appError('All fields are mandatory', 400));
        }

        const htmlMessage = `
            <h2>New Contact Message</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Message:</b></p>
            <p>${message}</p>
        `;

        await sendEmail(process.env.SMTP_FROM_EMAIL, 'New Contact Form Message', htmlMessage);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully',
        });
    } catch (error) {
        next(new appError(error.message, 500));
    }
};

// ================= FIXED USER STATS =================
export const userStats = async (req, res, next) => {
    try {
        const allUsersCount = await User.countDocuments();

        // Count users who have active subscription
        const subscribedCount = await User.countDocuments({
            subscription: { $exists: true, $ne: null }
        });

        res.status(200).json({
            success: true,
            allUsersCount,
            subscribedCount,
            message: "Stats fetched successfully"
        });
    } catch (error) {
        console.error("User Stats Error:", error);   // ← Helpful for debugging
        return next(new appError(error.message || "Failed to fetch stats", 500));
    }
};