import { useState } from 'react';
import IncidenciasView from './components/IncidenciasView';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('incidencias');

  const renderContent = () => {
    switch(activeSection) {
      case 'incidencias':
        return <IncidenciasView />;
      
      case 'inicio':
        return (
          <div className="section-content">
            <h1>🏠 Inicio</h1>
            <p>Panel de inicio del proyecto</p>
          </div>
        );
      
      case 'planos':
        return (
          <div className="section-content">
            <h1>📐 Planos</h1>
            <p>Gestión de planos del proyecto</p>
          </div>
        );
      
      case 'archivos':
        return (
          <div className="section-content">
            <h1>📄 Archivos</h1>
            <p>Documentos y archivos del proyecto</p>
          </div>
        );
      
      case 'especificaciones':
        return (
          <div className="section-content">
            <h1>📋 Especificaciones</h1>
            <p>Especificaciones técnicas del proyecto</p>
          </div>
        );
      
      case 'formularios':
        return (
          <div className="section-content">
            <h1>📝 Formularios</h1>
            <p>Formularios del proyecto</p>
          </div>
        );
      
      case 'fotos':
        return (
          <div className="section-content">
            <h1>📷 Fotos</h1>
            <p>Galería de fotos del proyecto</p>
          </div>
        );
      
      case 'informes':
        return (
          <div className="section-content">
            <h1>📈 Informes</h1>
            <p>Reportes y estadísticas</p>
          </div>
        );
      
      default:
        return (
          <div className="section-content">
            <h1>🚧 {activeSection}</h1>
            <p>Sección en desarrollo...</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Menu 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;