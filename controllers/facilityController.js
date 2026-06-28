import { ObjectId } from "mongodb";
import { facilitiesCollection } from "../config/db.js";

export const getAllFacilities = async (req, res) => {
  try {
    const { search = "", type = "" } = req.query;

    const query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (type) {
      query.facility_type = {
        $in: [type],
      };
    }

    const facilities = await facilitiesCollection
      .find(query)
      .toArray();

    res.status(200).json(facilities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch facilities",
    });
  }
};

export const getFacilityById = async (req, res) => {
  try {
    const facility = await facilitiesCollection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!facility) {
      return res.status(404).json({
        message: "Facility not found",
      });
    }

    res.status(200).json(facility);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addFacility = async (req, res) => {
  try {
    const result = await facilitiesCollection.insertOne(req.body);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create facility",
    });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const result = await facilitiesCollection.updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const result = await facilitiesCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};