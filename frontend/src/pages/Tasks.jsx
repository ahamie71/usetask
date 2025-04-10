import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, PlusCircle, Edit3, Trash2, LogOut, X, ClipboardList } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("en cours"); // Ajout du status
  const [editingTask, setEditingTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState(""); // Champ de recherche
  const [startDate, setStartDate] = useState(""); // Date de début pour le filtre
  const [endDate, setEndDate] = useState(""); // Date de fin pour le filtre
  const [filterStatus, setFilterStatus] = useState(""); // Filtrer par statut
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          setErrorMessage("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setErrorMessage("Erreur lors de la récupération des tâches.");
        }
      }
    };

    fetchTasks();
  }, [token, navigate]);

  const addTask = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5002/api/tasks",
        { title, description, status }, // Ajout du status ici
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) => [...prevTasks, res.data]);
      setTitle("");
      setDescription("");
      setStatus("en cours"); // Réinitialiser le status à "en cours"
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setErrorMessage("Erreur lors de l'ajout de la tâche.");
      }
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status); // Pré-remplir le status lors de l'édition
  };

  const updateTask = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await axios.put(
        `http://localhost:5002/api/tasks/${editingTask._id}`,
        { title, description, status }, // Inclure le status lors de la modification
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === editingTask._id ? res.data : task
        )
      );
      setEditingTask(null);
      setTitle("");
      setDescription("");
      setStatus("en cours"); // Réinitialiser le status à "en cours"
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setErrorMessage("Erreur lors de la modification de la tâche.");
      }
    }
  };

  const deleteTask = async (id) => {
    setErrorMessage("");
    try {
      await axios.delete(`http://localhost:5002/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setErrorMessage("Erreur lors de la suppression de la tâche.");
      }
    }
  };

  // Filtrer les tâches en fonction du titre, du texte de recherche, des dates et du statut
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStartDate = startDate ? new Date(task.createdAt) >= new Date(startDate) : true;
    const matchesEndDate = endDate ? new Date(task.createdAt) <= new Date(endDate) : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;

    return matchesSearch && matchesStartDate && matchesEndDate && matchesStatus;
  });

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ClipboardList className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Gestionnaire de Tâches</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Message d'erreur */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtre par texte, dates et statut */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-2xl font-medium text-gray-900">Filtrer</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Filtre par titre */}
            <div>
              <label htmlFor="search" className="block text-lg font-medium text-gray-700">
                Recherche par titre
              </label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Recherche"
              />
            </div>
            {/* Filtre par date de début */}
            <div>
              <label htmlFor="startDate" className="block text-lg font-medium text-gray-700">
                Date de début
              </label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* Filtre par date de fin */}
            <div>
              <label htmlFor="endDate" className="block text-lg font-medium text-gray-700">
                Date de fin
              </label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            {/* Filtre par statut */}
            <div>
              <label htmlFor="filterStatus" className="block text-lg font-medium text-gray-700">
                Statut
              </label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Tous</option>
                <option value="en cours">En cours</option>
                <option value="terminée">Terminée</option>
                <option value="en attente">En attente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Formulaire de tâche */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={editingTask ? updateTask : addTask} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Sélecteur de statut */}
            <div>
              <label htmlFor="status" className="block text-lg font-medium text-gray-700">
                Statut
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="en cours">En cours</option>
                <option value="terminée">Terminée</option>
                <option value="en attente">En attente</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              {editingTask && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTask(null);
                    setTitle("");
                    setDescription("");
                    setStatus("en cours"); // Réinitialiser le status à "en cours"
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {editingTask ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Modifier
                  </>
                ) : (
                  <>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Ajouter
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tâches filtrées */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Title: {task.title}</h3>
                <p className="text-gray-900 text-lg mb-4">Description: {task.description}</p>
                <p className="text-gray-400 text-lg mb-4">Créé le {formatDate(task.createdAt)}</p>
                <p className="text-lg font-medium text-gray-600">Statut: {task.status}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="inline-flex items-center p-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="inline-flex items-center p-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
