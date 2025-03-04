
import React, { useState } from 'react';
import { useGetSeminarsQuery } from '../api/seminarsApi';
import SeminarItem from './SeminarItem';
import { motion, AnimatePresence } from 'framer-motion';

const SeminarList: React.FC = () => {
  const { data: seminars, error, isLoading } = useGetSeminarsQuery();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;

  const filteredSeminars = seminars?.filter((seminar) =>
    seminar.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seminar-list-container">
      <input
        type="text"
        placeholder="Поиск семинаров..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <AnimatePresence>
        {filteredSeminars && filteredSeminars.map((seminar) => (
          <motion.div
            key={seminar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SeminarItem seminar={seminar} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SeminarList;
