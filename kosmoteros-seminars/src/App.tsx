import React, { useState } from 'react';
import { Seminar, useGetSeminarsQuery } from './api/seminarsApi';
import SeminarItem from './components/SeminarItem';

const App: React.FC = () => {

  const { data: seminars, error, isLoading } = useGetSeminarsQuery();
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>(seminars || []);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных.</div>;
  if (!seminars) return <div>Ошибка загрузки семинаров.</div>;

  return (
    <div className="App">
      <header>
        <h1>Семинары</h1>
        <p>Выберите семинар для редактирования или удаления.</p>
      </header>

      <div>
        <input
          type="text"
          placeholder="Поиск по названию..."
          onChange={(e) => {
            const query = e.target.value.toLowerCase();
            setFilteredSeminars(
              seminars.filter((seminar) =>
                seminar.title.toLowerCase().includes(query)
              )
            );
          }}
        />
      </div>

      <div className="seminar-list">
        {filteredSeminars.map((seminar) => (
          <SeminarItem key={seminar.id} seminar={seminar} />
        ))}
      </div>
    </div>
  );
};

export default App;
