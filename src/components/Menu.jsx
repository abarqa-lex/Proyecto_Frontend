import { useState } from 'react';
import '../styles/Menu.css';

function Menu({ activeSection, onSectionChange }) {
  const menuItems = [
    { id: 'inicio', icon: '🏠', label: 'Inicio' },
    { id: 'planos', icon: '📐', label: 'Planos' },
    { id: 'archivos', icon: '📄', label: 'Archivos' },
    { id: 'especificaciones', icon: '📋', label: 'Especificaciones' },
    { id: 'incidencias', icon: '✅', label: 'Incidencias' },
    { id: 'formularios', icon: '📝', label: 'Formularios' },
    { id: 'fotos', icon: '📷', label: 'Fotos' },
    { id: 'sdi', icon: '💬', label: 'SDI' },
    { id: 'remisiones', icon: '👤', label: 'Remisiones' },
    { id: 'reuniones', icon: '👥', label: 'Reuniones' },
    { id: 'correspondencia', icon: '✉️', label: 'Correspondencia' },
    { id: 'planificacion', icon: '📊', label: 'Planificación' },
    { id: 'activos', icon: '🔧', label: 'Activos' },
    
  ];

  return (
    <nav className="menu-lateral">
      {/* Header */}
      <div className="menu-header">
        <div className="logo">
          <span className="logo-icon">🔨</span>
          <h2>Build</h2>
        </div>
      </div>

      {/* Lista de navegación */}
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;