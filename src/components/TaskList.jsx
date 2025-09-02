import React from 'react';
import TaskItem from './TaskItem';
import styles from '../styles/TaskList.module.css';

function TaskList({ tasks, filteredTasks, onToggle, onEdit, onDelete }) {
  // Mensagem exibida quando não há tarefas cadastradas
  if (tasks.length === 0) {
    return (
      <span>
        <em>Nenhuma tarefa adicionada...</em>
      </span>
    );
  }

  // Mensagem exibida quando nenhuma tarefa corresponde ao filtro/pesquisa
  if (filteredTasks.length === 0) {
    return (
      <span>
        <em>Nenhuma tarefa corresponde à busca ou filtro...</em>
      </span>
    );
  }

  // Renderiza a lista de tarefas filtradas usando o componente TaskItem
  return (
    <ul className={styles.list}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
