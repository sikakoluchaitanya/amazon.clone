const nodemailer = require('nodemailer');
const { generateOrderPlacementTemplate, generateInvoiceTemplate } = require('./emailTemplates');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD?.replace(/'/g, "") // Remove quotes if added by echo
    }
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        const mailOptions = {
            from: `"Amazon Clone" <${process.env.GMAIL_USER}>`,
            to: process.env.DEFAULT_EMAIL_RECIPIENT || to, // Override for dev as requested
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't throw error to avoid failing the order process? 
        // Or throw to alert? Usually logging is enough for non-critical notification.
        return null;
    }
};

const sendOrderConfirmation = async (order) => {
    const subject = `Order Confirmation - #${order.id}`;
    const html = generateOrderPlacementTemplate(order);
    return sendEmail({ to: order.user_email, subject, html }); // user_email might be fetched or hardcoded
};

const sendInvoice = async (order) => {
    const subject = `Invoice for Order #${order.id}`;
    const html = generateInvoiceTemplate(order);
    return sendEmail({ to: order.user_email, subject, html });
};

module.exports = {
    sendOrderConfirmation,
    sendInvoice
};
