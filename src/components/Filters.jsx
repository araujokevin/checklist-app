import React from 'react';
import styles from '../styles/Filters.module.css';

export default function Filters({
  searchText,
  setSearchText,
  sortOption,
  setSortOption,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div
      className={styles.filters}
      role="group"
      aria-label="Filtros de tarefas"
    >
      {/* Input de busca */}
      <label htmlFor="task-search" className="sr-only">
        Buscar tarefas
      </label>
      <input
        type="text"
        id="task-search"
        placeholder="Buscar tarefas..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        aria-label="Buscar tarefas"
      />

      {/* Select de ordenação */}
      <label htmlFor="task-sort" className="sr-only">
        Ordenar tarefas
      </label>
      <select
        id="task-sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        aria-label="Ordenar tarefas"
      >
        <option value="sem ordem">Sem ordem</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Concluídas">Concluídas</option>
        <option value="Pendentes">Pendentes</option>
      </select>

      {/* Botões de status */}
      <div
        className={styles.statusButtons}
        role="group"
        aria-label="Filtrar por status"
      >
        {['Todas', 'Concluídas', 'Pendentes'].map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={statusFilter === status}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
