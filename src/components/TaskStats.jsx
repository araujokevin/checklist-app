import styles from '../styles/TaskStats.module.css';

export default function TaskStats({ allTasks, onDeleteAll }) {
  // Cálculo rápido de estatísticas da lista de tarefas
  const total = allTasks.length;
  const completed = allTasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stats}>
        <span>Total: {total}</span>
        <span>Concluídas: {completed}</span>
        <span>Pendentes: {pending}</span>
      </div>
      {/* Botão para deletar todas as tarefas, exibido apenas se houver tarefas */}
      {total > 0 && (
        <button
          className={styles.deleteAllBtn}
          onClick={onDeleteAll}
          title="Excluir todas as tarefas"
        >
          Excluir todas
        </button>
      )}
    </div>
  );
}
