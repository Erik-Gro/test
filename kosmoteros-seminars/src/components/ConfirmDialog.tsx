
import React from 'react';
import { motion } from 'framer-motion';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <motion.div
        className="confirm-dialog"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
      >
        <p>{message}</p>
        <div className="confirm-buttons">
          <button onClick={onConfirm} className="confirm-yes">Да</button>
          <button onClick={onCancel} className="confirm-no">Нет</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDialog;
