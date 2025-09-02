import { useState } from 'react';
import styles from '../styles/TaskInput.module.css';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(text); // A validação de texto vazio é feita no App.jsx
    setText(''); // Limpa o input após submissão
  };

  return (
    <form
      className={styles.inputContainer}
      onSubmit={handleSubmit}
      aria-label="Adicionar nova tarefa"
    >
      <label htmlFor="new-task" className="sr-only">
        Nova tarefa
      </label>
      <input
        type="text"
        id="new-task"
        name="new-task"
        placeholder="Adicionar nova tarefa..."
        aria-required="true"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" aria-label="Adicionar tarefa">
        +
      </button>
    </form>
  );
}
