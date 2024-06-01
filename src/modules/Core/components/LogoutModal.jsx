import React from "react";
import "../css/LogoutModal.css"; // Asume que los estilos están en este archivo

const LogoutModal = ({ show, onLogoutConfirm, onCancel }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <div className="logout-modal-header">
          Logout
        </div>
        <div className="logout-modal-body">
          ¿Está seguro que quiere cerrar sesión?
        </div>
        <div className="logout-modal-footer">
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-logout" onClick={onLogoutConfirm}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;