import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState(""); // Utilisation de "name" pour l'utilisateur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = { name, email, password }; // Envoi de "name" au backend
    console.log("Données envoyées :", userData);

    try {
      const res = await axios.post("http://localhost:5001/api/users/register", userData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Réponse du serveur :", res.data);
     
      navigate("/login"); // Redirection vers la page de connexion après inscription
    } catch (error) {
      console.error("Erreur d'inscription :", error.response?.data || error.message);
      alert(error.response?.data?.message || "Échec de l'inscription !");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "22rem" }}>
        <h2 className="text-center mb-4">Inscription</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Vous avez déjà un compte ?</span>
          <a href="/" className="text-decoration-none"> Se connecter</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
