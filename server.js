require("dotenv").config();
const express = require("express");
const cors = require("cors");
const agentRoutes = require("./src/routes/agentRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/agents", agentRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
