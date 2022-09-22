import styles from './styles.module.css';

import { Task as TaskType } from "../../typing"
import { Task } from '../Task';

interface IProps {
  tasks: TaskType[];
  handleDelete: (task: TaskType) => void;
  handleToggle: (task: TaskType) => void;
}

export const TaskList = ({ tasks, handleToggle, handleDelete }: IProps) => {
  return (
    <section className={styles.task_list}>
      { tasks.map(
        task => {
          return <Task 
                    key={task.id}
                    task={task} 
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                  />
        }
      ) }
    </section>
  )
}