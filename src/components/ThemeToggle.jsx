import { useState, useEffect } from 'react';
import styles from '../styles/ThemeToggle.module.css';

export default function ThemeToggle() {
  // Estado do tema, padrão do localStorage ou 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // Aplica a classe ao body sempre que o tema muda
  useEffect(() => {
    document.body.dataset.theme = theme; // usamos data-theme no body
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Alternar tema claro/escuro"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon"></i>
      ) : (
        <i className="fas fa-sun"></i>
      )}
    </button>
  );
}
