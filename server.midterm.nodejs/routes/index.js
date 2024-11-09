const express = require("express");
const router = express.Router();
const { getDatabaseStatus } = require("../configs/database.config");

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("index", {
        title: "Express",
        serverUrl: process.env.SERVER_URL,
        dbStatus: getDatabaseStatus(),
    });
});

module.exports = router;
