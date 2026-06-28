import { ObjectId } from "mongodb";
import {
  bookingsCollection,
  facilitiesCollection,
} from "../config/db.js";

export const createBooking = async (req, res) => {
  try {
    const booking = {
      ...req.body,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(booking);

    await facilitiesCollection.updateOne(
      {
        _id: new ObjectId(req.body.facility_id),
      },
      {
        $inc: {
          booking_count: 1,
        },
      }
    );

    res.status(201).json(result);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Booking failed",
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingsCollection
      .find({
        user_email: req.query.email,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    res.json(bookings);
  } catch (err) {
    res.status(500).json({
      message: "Failed",
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await bookingsCollection.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          status: "cancelled",
        },
      }
    );

    await facilitiesCollection.updateOne(
      {
        _id: new ObjectId(booking.facility_id),
      },
      {
        $inc: {
          booking_count: -1,
        },
      }
    );

    res.json({
      message: "Cancelled",
    });
  } catch (err) {
    res.status(500).json({
      message: "Cancel failed",
    });
  }
};