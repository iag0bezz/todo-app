import styles from './styles.module.css';

import { PlusCircle } from 'phosphor-react'
import { EmptyList } from '../EmptyList';
import { Task as TaskType } from '../../typing';
import { TaskList } from '../TaskList';
import { useEffect, useState } from 'react';

export const Content = () => {
  const [content, setContent] = useState('');

  const [tasks, setTasks] = useState<TaskType[]>(() => {
    if (localStorage.getItem('@tasks') !== null) {
      return JSON.parse(
        localStorage.getItem('@tasks')!
      ) as TaskType[]
    }

    return tasks;
  });

  useEffect(() => {
    localStorage.setItem('@tasks', JSON.stringify(tasks));
  }, [tasks])

  const handleDeleteTask = (id: number) => {
    setTasks(
      tasks.filter(task => task.id !== id)
    );
  }

  const handleToggleCompleted = (id: number) => {
    setTasks(
      tasks.map(
        task => {
          if (task.id === id) {
            task.completed = !task.completed;
          }

          return task;
        }
      )
    )
  }

  const handleCreateTask = () => {
    const task: TaskType = {
      id: new Date().getTime(),
      completed: false,
      content: content,
      created_at: new Date(),      
    };

    setTasks([
      ...tasks,
      task
    ])
    setContent('')
  }

  const completed_tasks = tasks.length === 0 ? 0 : `${tasks.filter(task => task.completed).length} de ${tasks.length}`;

  return (
    <main className={styles.content}>
      <form onSubmit={handleCreateTask} className={styles.form}>
        <input required onChange={(event) => setContent(event?.target.value)} placeholder='Adicione uma nova tarefa' type='text' />
        <button type="submit">CRIAR <PlusCircle size={16} /></button>
      </form>
      
      <div className={styles.info}>
        <div className={styles.tasks}>
          <strong>Tarefas criadas</strong>
          <span>{ tasks.length }</span>
        </div>
        <div className={styles.divisor}></div>
        <div className={styles.finished}>
          <strong>Concluídas</strong>
          <span>{ completed_tasks }</span>
        </div>
      </div>

      { tasks.length === 0 ? 
        <EmptyList /> : <TaskList 
                          handleDelete={handleDeleteTask} 
                          handleToggle={handleToggleCompleted} 
                          tasks={
                            tasks.sort(
                              (a: TaskType, b: TaskType) => a.completed - b.completed
                            )
                          } 
                        /> }
    </main>
  )
}