import styles from '../styles/Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Checklist</h1>
      <ThemeToggle />
    </header>
  );
}
