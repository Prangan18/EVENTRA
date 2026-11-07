// EVENTRA - Event Management Backend

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");

require("dotenv").config();

// DNS configuration
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const Registration = require("./models/Registration");
const Message = require("./models/Message");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {
    res.send("Welcome to EVENTRA Backend!");
});

// =====================================
// HEALTH CHECK
// =====================================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "EVENTRA Backend is running successfully!"
    });
});

// =====================================
// REGISTER FOR AN EVENT
// =====================================

app.post("/api/register", async (req, res) => {
    try {
        const { eventName, name, email, phone } = req.body;

        if (!eventName || !name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields."
            });
        }

        const registration = new Registration({
            eventName,
            name,
            email,
            phone
        });

        await registration.save();

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            registration
        });

    } catch (error) {
        console.error("Registration Error:", error);

        res.status(500).json({
            success: false,
            message: "Registration failed.",
            error: error.message
        });
    }
});

// =====================================
// GET ALL REGISTRATIONS
// =====================================

app.get("/api/registrations", async (req, res) => {
    try {
        const registrations = await Registration.find()
            .sort({ registeredAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            registrations
        });

    } catch (error) {
        console.error("Fetch Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch registrations.",
            error: error.message
        });
    }
});

// =====================================
// CONTACT FORM SUBMISSION
// =====================================

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const newMessage = new Message({
            name,
            email,
            message
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Your message has been received!"
        });

    } catch (error) {
        console.error("Contact Form Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send your message.",
            error: error.message
        });
    }
});

// =====================================
// START SERVER AND CONNECT DATABASE
// =====================================

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from the .env file.");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");

        app.listen(PORT, () => {
            console.log(`EVENTRA Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server Startup Failed:", error.message);
    }
}

startServer();