import styles from './styles.module.css';

import { Notepad } from 'phosphor-react';

export const EmptyList = () => {
  return (
    <section className={styles.container}>
      <div className={styles.empty_list}>
        <Notepad size={96} />
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </section>
  )
}