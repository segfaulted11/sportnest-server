import express from "express";

import {
  getAllFacilities,
  getFacilityById,
  addFacility,
  updateFacility,
  deleteFacility,
} from "../controllers/facilityController.js";

const router = express.Router();

router.get("/", getAllFacilities);

router.get("/:id", getFacilityById);

router.post("/", addFacility);

router.put("/:id", updateFacility);

router.delete("/:id", deleteFacility);

export default router;