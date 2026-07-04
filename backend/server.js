const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors({origin: process.env.CLIENT_URL}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const memorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    tag: String,
    date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    }
});

const Memory = mongoose.model("Memory", memorySchema);

app.post("/memory", async (req, res) => {
    try {

        const memory = await Memory.create({
            title: req.body.title,
            note: req.body.note,
            tag: req.body.tag
        });

        res.status(201).json(memory);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/memories", async (req, res) => {
    try {

        const memories = await Memory.find().sort({ _id: -1 });

        res.json(memories);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete("/memory/:id", async (req, res) => {
    try {

        await Memory.findByIdAndDelete(req.params.id);

        res.json({
            message: "Memory deleted"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put("/memory/:id", async (req, res) => {
    try {

        const memory = await Memory.findByIdAndUpdate(
            req.params.id,
            {
                note: req.body.note
            },
            {
                new: true
            }
        );

        res.json(memory);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});