import React, { useState } from "react";
import {
  Seminar,
  useDeleteSeminarMutation,
  useUpdateSeminarMutation,
} from "../api/seminarsApi";
import Modal from "./Modal";
import { motion } from "framer-motion";

interface SeminarItemProps {
  seminar: Seminar;
}

const SeminarItem: React.FC<SeminarItemProps> = ({ seminar }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteSeminar] = useDeleteSeminarMutation();
  const [updateSeminar] = useUpdateSeminarMutation();
  const [formData, setFormData] = useState({ ...seminar });

  const handleDelete = async () => {
    await deleteSeminar(seminar.id);
    setIsDeleteOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSeminar(formData);
    setIsEditOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <motion.div
      className="seminar-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="seminar-image">
        <img src={seminar.photo} alt={seminar.title} />
      </div>
      <div className="seminar-content">
        <h2 className="seminar-title">{seminar.title}</h2>
        <p className="seminar-description">{seminar.description}</p>
        <p className="seminar-datetime">
          {seminar.date} в {seminar.time}
        </p>
        <div className="seminar-actions">
          <button onClick={() => setIsEditOpen(true)} className="btn btn-edit">
            Редактировать
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="btn btn-delete"
          >
            Удалить
          </button>
        </div>
      </div>

      {isEditOpen && (
        <Modal onClose={() => setIsEditOpen(false)}>
          <h3>Редактировать семинар</h3>
          <form onSubmit={handleEditSubmit} className="modal-form">
            <label>
              Название:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Описание:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="input-field textarea"
              />
            </label>
            <label>
              Дата:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <label>
              Время:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="input-field"
              />
            </label>
            <button type="submit" className="btn btn-submit">
              Сохранить изменения
            </button>
          </form>
        </Modal>
      )}

      {isDeleteOpen && (
        <Modal onClose={() => setIsDeleteOpen(false)}>
          <h3>Вы уверены, что хотите удалить этот семинар?</h3>
          <div className="confirm-buttons">
            <button onClick={handleDelete} className="btn btn-delete">
              Да
            </button>
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="btn btn-edit"
            >
              Нет
            </button>
          </div>
        </Modal>
      )}
    </motion.div>
  );
};

export default SeminarItem;
