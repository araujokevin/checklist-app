import React, { useState } from 'react';
import styles from '../styles/TaskItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  // Estado para controle do modo de edição
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  // Ativa o modo de edição
  function handleEditToggle() {
    setIsEditing(true);
  }

  // Cancela edição e restaura texto original
  function handleEditCancel() {
    setEditedText(task.text); // restaura o texto original
    setIsEditing(false);
  }

  // Confirma edição, apenas se houver texto válido
  function handleEditSubmit() {
    if (editedText.trim() !== '') {
      onEdit && onEdit(task.id, editedText.trim());
      setIsEditing(false);
    }
  }

  // Atalhos de teclado: Enter = confirmar, Esc = cancelar
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  }

  return (
    <div className={styles.item}>
      {/* Checkbox de completar tarefa */}
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle && onToggle(task.id)}
      />

      {/* Exibe texto ou input de edição */}
      {isEditing ? (
        <input
          className={styles.editInput}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={handleKeyDown} // captura Enter e Esc
          autoFocus
        />
      ) : (
        <span
          className={`${styles.text} ${task.completed ? styles.completed : ''}`}
        >
          {task.text}
        </span>
      )}

      {/* Botões de ação */}
      <div className={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <button
              className={styles.confirmBtn}
              onClick={handleEditSubmit}
              title="Confirmar edição"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className={styles.cancelBtn}
              onClick={handleEditCancel}
              title="Cancelar edição"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </>
        ) : (
          <>
            <button
              className={styles.editBtn}
              onClick={handleEditToggle}
              title="Editar"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete && onDelete(task.id)}
              title="Excluir"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
