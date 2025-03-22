const Task = require("../models/Task"); // Modèle de la tâche (assure-toi que le modèle est bien défini)
const User = require("../models/User"); // Modèle de l'utilisateur

// Ajouter une tâche

// Ajouter une tâche
exports.addTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
      const newTask = new Task({
        title,
        description,
        user: req.user._id,
        status: status || "en attente",  // Utilise le statut passé dans le corps de la requête ou le statut par défaut
      });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'ajout de la tâche." });
    }
  };
  
// Récupérer toutes les tâches de l'utilisateur connecté
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches." });
  }
};

// Modifier une tâche
exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    
    try {
      // Chercher la tâche à mettre à jour pour l'utilisateur connecté
      const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
      if (!task) {
        return res.status(404).json({ message: "Tâche non trouvée." });
      }
  
      // Mettre à jour les champs
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;  // Mettre à jour le statut si un nouveau est fourni
  
      // Sauvegarder la tâche mise à jour
      await task.save();
      res.json(task);  // Retourner la tâche mise à jour
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche." });
    }
  };
  
  

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée." });
    }
    res.json({ message: "Tâche supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche." });
  }
};
