import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Yes, Delete</button>
          <button onClick={onCancel}  className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;