import express from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/my", getMyBookings);

router.patch("/:id/cancel", cancelBooking);

export default router;