import styles from './styles.module.css';

import { PlusCircle } from 'phosphor-react'
import { EmptyList } from '../EmptyList';
import { Task as TaskType } from '../../typing';
import { TaskList } from '../TaskList';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginModal } from '../LoginModal';
import { useTodos } from '../../hooks/useTodos';
import shallow from 'zustand/shallow';

export const Content = () => {
  const [authenticated, user, logOut] = useAuth((state) => [
    state.authenticated,
    state.user,
    state.logOut
  ], shallow);
  
  const [todos, remove, toggle, add] = useTodos((state) => [
    state.todos,
    state.remove,
    state.toggle,
    state.add
  ], shallow);

  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleDeleteTask = (task: TaskType) => {
    remove(task);
  }

  const handleToggleCompleted = (task: TaskType) => {
    toggle(task);
  }

  const handleCreateTask = () => {
    event?.preventDefault();

    const task: TaskType = {
      id: new Date().getTime(),
      completed: false,
      content: content,
      created_at: new Date(),      
    };

    add(task);

    setContent('')
  }

  const completed_tasks = todos.length === 0 ? 0 : `${todos.filter(task => task.completed).length} de ${todos.length}`;

  return (
    <main className={styles.content}>
      <form onSubmit={handleCreateTask} className={styles.form}>
        <input required value={content} onChange={(event) => setContent(event?.target.value)} placeholder='Adicione uma nova tarefa' type='text' />
        <button type="submit">CRIAR <PlusCircle size={16} /></button>
      </form>

      { 
        !authenticated ?
        <span className={styles.offline}>
          Você está em uma visualização offline, para se autenticar
          <span onClick={() => setModalOpen(true)}>
            Clique aqui
          </span>
        </span>
        : 
        <span className={styles.online}>
          Você está logado como { user?.username }
          <span onClick={() => logOut()}>
            Clique para sair
          </span>
        </span>
      }

      <LoginModal 
        open={isModalOpen}
        toggle={setModalOpen}
      />
      
      <div className={styles.info}>
        <div className={styles.tasks}>
          <strong>Tarefas criadas</strong>
          <span>{ todos.length }</span>
        </div>
        <div className={styles.divisor}></div>
        <div className={styles.finished}>
          <strong>Concluídas</strong>
          <span>{ completed_tasks }</span>
        </div>
      </div>

      { todos.length === 0 ? 
        <EmptyList /> : <TaskList 
                          handleDelete={handleDeleteTask} 
                          handleToggle={handleToggleCompleted} 
                          tasks={
                            todos.sort(
                              (a: TaskType, b: TaskType) => a.completed - b.completed
                            )
                          } 
                        /> }
    </main>
  )
}