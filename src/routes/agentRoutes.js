const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agentController");

const upload = require("../config/upload.js");

router.get("/", agentController.getAllAgents);
router.get("/:id", agentController.getAgent);
router.post("/", upload.single("photo"), agentController.createAgent);
router.put("/:id", upload.single("photo"), agentController.updateAgent);
router.delete("/:id", agentController.deleteAgent);

module.exports = router;
