const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { protect, adminOnly } = require("../middleware/authMiddleware");


// ================= CREATE EVENT (ADMIN ONLY) =================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json(event);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= GET ALL EVENTS (ANY LOGGED USER) =================
router.get("/", protect, async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email role");

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= GET SINGLE EVENT =================
router.get("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email role");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= UPDATE EVENT (ADMIN ONLY) =================
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;

    const updatedEvent = await event.save();

    res.json(updatedEvent);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= DELETE EVENT (ADMIN ONLY) =================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
