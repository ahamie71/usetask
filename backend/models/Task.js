const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assure-toi que le modèle 'User' est bien relié ici
    required: true,
  },
  status: {
    type: String,
    enum: ["en cours", "terminée", "en attente"], // On définit ici les valeurs possibles pour le statut
    default: "en attente", // Le statut par défaut est "en attente"
  },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
