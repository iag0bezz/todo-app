import { Task as TaskType } from '../../typing';
import styles from './styles.module.css';

import { Check, Trash } from 'phosphor-react';

interface IProps {
  task: TaskType;
  handleDelete: (task: TaskType) => void;
  handleToggle: (task: TaskType) => void;
}

export const Task = ({ task, handleToggle, handleDelete }: IProps) => {
  return (
    <div className={styles.container}>
      <div onClick={() => handleToggle(task)}>
        <span
          className={`${styles.check} ${task.completed && styles.checked}`}
        >
          { task.completed && <Check size={10} weight='bold' /> }
        </span>
      </div>
      <div className={styles.textDiv}>
        <p className={`${styles.text} ${task.completed && styles.completed}`}>{task.content}</p>
      </div>
      <div>
        <Trash onClick={() => handleDelete(task)} className={styles.trash} size={16} />
      </div>
    </div>
  )
}