import React from 'react';
import { useNavigate } from 'react-router-dom';
import taskImage from '../assets/images/Central de Monitoreo.jpeg';
import timeImage from '../assets/images/Gestionnaire de fichiers_ Triez et déplacez votre documentaire vers des sous-dossiers.jpeg';
import notificationImage from "../assets/images/Usability Testing_ Improving Your Website's User Experience.jpeg";

function WelcomePage() {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Bienvenue sur notre Application de Gestion de Tâches !
        </h1>
        <p className="text-lg text-gray-600 mb-6 px-4">
          Découvrez toutes les fonctionnalités qui vous aideront à mieux organiser votre travail et à augmenter votre productivité. Chaque outil est conçu pour rendre votre quotidien plus fluide.
        </p>

        {/* Section des fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center hover:scale-105 transform transition-all duration-300 ease-in-out">
            <img 
              src={taskImage} 
              alt="Gestion des tâches" 
              className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">Gestion des Tâches</h3>
            <p className="text-gray-200">
              Organisez, suivez et accomplissez vos tâches de manière optimale avec des outils pratiques et simples.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center hover:scale-105 transform transition-all duration-300 ease-in-out">
            <img 
              src={timeImage}
              alt="Suivi du temps" 
              className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">Suivi du Temps</h3>
            <p className="text-gray-200">
              Suivez précisément le temps passé sur chaque tâche et maximisez votre efficacité.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center hover:scale-105 transform transition-all duration-300 ease-in-out">
            <img 
              src={notificationImage} 
              alt="Notifications" 
              className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg object-cover"
            />
            <h3 className="text-xl font-semibold mb-2 text-white">Notifications</h3>
            <p className="text-gray-200">
              Restez informé avec des rappels et des alertes pour ne rien oublier, même lors des journées les plus chargées.
            </p>
          </div>
        </div>

        {/* Bouton de découverte */}
        <button
          onClick={handleDiscoverClick}
          className="px-10 py-4 bg-indigo-600 text-white text-lg font-medium rounded-full hover:bg-indigo-700 transition duration-300 shadow-xl transform hover:scale-105"
        >
          Découvrir notre Application
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
