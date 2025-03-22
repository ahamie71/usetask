const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Inscription
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Utilise "name" ici

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Utilisateur déjà existant" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword }); // Utilise "name" ici aussi
        await user.save();

        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.error("Erreur d'inscription :", error.message); 
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


// Connexion
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
