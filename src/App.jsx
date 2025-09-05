import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import TaskStats from './components/TaskStats';
import styles from './styles/App.module.css';

/**
 * Componente principal da aplicação Checklist
 * Responsável por gerenciar o estado global das tarefas (CRUD),
 * aplicar filtros, ordenação, persistir dados no localStorage
 * e renderizar os componentes filhos.
 */
export default function App() {
  /**
   * Estado principal da aplicação:
   * - Carregado inicialmente do localStorage (persistência entre sessões).
   */
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Estado dos filtros de busca, ordenação e status
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('Sem ordem');
  const [statusFilter, setStatusFilter] = useState('Todas');

  /**
   * Efeito responsável por salvar as tarefas no localStorage
   * sempre que o estado `tasks` for alterado.
   */
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * CRUD OPERATIONS
   * Funções responsáveis por manipular as tarefas
   */

  // Adiciona uma nova tarefa
  function handleAddTask(text) {
    if (text.trim() === '') return;
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([newTask, ...tasks]);
  }

  // Remove uma tarefa pelo ID
  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Alterna o status de conclusão da tarefa
  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Edita o texto de uma tarefa existente
  function handleEdit(id, newText) {
    if (newText.trim() === '') return;
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  // Remove todas as tarefas (com confirmação do usuário)
  function handleDeleteAll() {
    if (window.confirm('Tem certeza que deseja excluir todas as tarefas?')) {
      setTasks([]);
    }
  }

  /**
   * Função auxiliar para normalizar strings:
   * - Remove acentos
   * - Remove espaços extras
   * - Converte para minúsculas
   * Isso garante que a busca seja "accent-insensitive" e "case-insensitive".
   */
  function normalize(s) {
    return s
      .normalize('NFD') // separa letras de acentos (ex: á → a +  ́)
      .replace(/\p{Diacritic}/gu, '') // remove os acentos
      .trim() // remove espaços extras no início/fim
      .toLowerCase(); // deixa tudo minúsculo
  }

  /**
   * Lista de tarefas filtrada e ordenada.
   * UseMemo evita recalcular toda vez, só quando as dependências mudam.
   */
  const filteredTasks = useMemo(() => {
    const query = normalize(searchText);

    return (
      tasks
        // Filtro por texto
        .filter((task) => {
          if (query === '') return true; // sem busca → retorna tudo
          return normalize(task.text).includes(query);
        })
        // Filtro por status (todas, concluídas, pendentes)
        .filter((task) =>
          statusFilter === 'Todas'
            ? true
            : statusFilter === 'Concluídas'
            ? task.completed
            : !task.completed
        )
        // Ordenação personalizada
        .sort((a, b) => {
          if (sortOption === 'Sem ordem') return 0;
          if (sortOption === 'A-Z') return a.text.localeCompare(b.text);
          if (sortOption === 'Z-A') return b.text.localeCompare(a.text);
          if (sortOption === 'Concluídas') return b.completed - a.completed;
          if (sortOption === 'Pendentes') return a.completed - b.completed;
          return 0;
        })
    );
  }, [tasks, searchText, sortOption, statusFilter]);

  /**
   * Renderização principal da aplicação:
   * - Header fixo
   * - Formulário de input de tarefas
   * - Filtros e lista de tarefas
   * - Estatísticas (somente quando houver tarefas)
   */

  return (
    <div className="app">
      <Header />
      <main className={styles.mainContainer}>
        <TaskInput onAddTask={handleAddTask} />

        {tasks.length > 0 && (
          <Filters
            searchText={searchText}
            setSearchText={setSearchText}
            sortOption={sortOption}
            setSortOption={setSortOption}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        <TaskList
          tasks={tasks} // array completo
          filteredTasks={filteredTasks} // array filtrado
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />

        {tasks.length > 0 && (
          <TaskStats
            allTasks={tasks} // para estatísticas completas
            filteredTasks={filteredTasks} // para deletar filtradas ou mostrar counts filtradas
            onDeleteAll={handleDeleteAll}
          />
        )}
      </main>
    </div>
  );
}
