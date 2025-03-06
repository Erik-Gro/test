import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {children}
      </motion.div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
