const agentModel = require("../models/agentModel");

const getAllAgents = async (req, res) => {
    try {
        const agents = await agentModel.getAgents();
        res.json(agents);
    } catch (error) {
        console.error("Erro ao buscar agentes:", error);
        res.status(500).json({ 
            message: "Erro ao buscar agentes.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const getAgent = async (req, res) => {
    try {
        const agent = await agentModel.getAgentById(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: "Agente não encontrado." });
        }
        res.json(agent);
    } catch (error) {
        console.error("Erro ao buscar agente:", error);
        res.status(500).json({ 
            message: "Erro ao buscar agente.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const createAgent = async (req, res) => {
    try {
        const { name, description, agentFunction } = req.body;
        const photo = req.file ? req.file.filename : null;
        const newAgent = await agentModel.createAgent(name, photo, description, agentFunction);
        res.status(201).json(newAgent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar agente." });
    }
};

const updateAgent = async (req, res) => {
    try {
        const { name, description, agentFunction } = req.body;
        const photo = req.file ? req.file.filename : null;
        const updatedAgent = await agentModel.updateAgent(req.params.id, name, photo, description, agentFunction);
        if (!updatedAgent) {
            return res.status(404).json({ message: "Agente não encontrado." });
        }
        res.json(updatedAgent);
    } catch (error) {
        console.error("Erro ao atualizar agente:", error);
        res.status(500).json({ 
            message: "Erro ao atualizar agente.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const deleteAgent = async (req, res) => {
    try {
        await agentModel.deleteAgent(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar agente:", error);
        res.status(500).json({ 
            message: "Erro ao deletar agente.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = { getAllAgents, getAgent, createAgent, updateAgent, deleteAgent };
