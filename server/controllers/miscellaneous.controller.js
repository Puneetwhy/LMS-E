import sendEmail from '../utils/sendEmail.js';
import appError from '../utils/error.util.js';

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

        await sendEmail(
            process.env.SMTP_FROM_EMAIL,
            'New Contact Form Message',
            htmlMessage
        );

        res.status(200).json({
            success: true,
            message: 'Message sent successfully',
        });
    } catch (error) {
        next(new appError(error.message, 500));
    }
};

export const userStats = async (req, res, next) => {
    res.status(200).json({
        success: true,
        users: 0
    });
};
