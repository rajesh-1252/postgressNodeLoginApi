import express from "express";

const router = express.Router();

// show all employees
router.route("/").get();
// filter based on available status,
// add pagination

// add employees
router.route("/:id").post();
router.route("/:id").patch();

export default router;
