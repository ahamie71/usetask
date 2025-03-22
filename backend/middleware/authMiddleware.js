const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Si tu as un modèle User

// Middleware pour vérifier le token JWT
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "Authentification requise." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Vérifie ton secret JWT
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé." });
    }
    
    req.user = user; // Ajoute l'utilisateur à req.user pour l'utiliser dans le contrôleur
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

module.exports = authMiddleware;
