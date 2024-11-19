const express = require("express");
const router = express.Router();
const {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomers,
} = require("../controllers/customer.controller");
const cache = require("../middlewares/cache");

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
// router.delete("/", deleteAllCustomers);

module.exports = router;
