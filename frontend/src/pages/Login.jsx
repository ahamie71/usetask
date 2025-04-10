import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5002/api/users/login", { email, password });

      // Enregistrement du token dans le localStorage
      localStorage.setItem("token", res.data.token);

      console.log("Réponse du serveur :", res.data);
      
      // Redirection vers la page des tâches
      navigate("/tasks");
    } catch (error) {
      console.error("Erreur de connexion :", error.response?.data || error.message);
      alert(error.response?.data?.message || "Échec de la connexion !");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "22rem" }}>
        <h2 className="text-center mb-4">Connexion</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
        <div className="mt-3 text-center">
          <span>Pas encore de compte ?</span>
          <a href="/register" className="text-decoration-none"> S'inscrire</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
