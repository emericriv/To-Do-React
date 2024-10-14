import { useEffect, useState } from "react";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { TaskInput } from "./taskInput/taskInput";
import { TaskList } from "./taskList/taskList";

// Composant qui affiche l'intégralité du site
export const TaskContainer = () => {
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasksList");
    if (storedTasks) {
      setTasksList(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasksList", JSON.stringify(tasks));
  };

  const addTask = (title) => {
    const newTask = {
      id: tasksList.length ? tasksList[tasksList.length - 1].id + 1 : 1,
      title: title,
      completed: false,
    };

    const updatedTasks = [...tasksList, newTask];
    setTasksList(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const editTask = (id, completedValue) => {
    const updatedTasks = tasksList.map((task) =>
      task.id === id ? { ...task, completed: completedValue } : task
    );
    setTasksList(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const deleteTask = (id) => {
    // Retourne un tableau de tâches sans celui qui a l'id correspondant
    const updatedTasks = tasksList.filter((task) => task.id !== id);
    setTasksList(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const getTaskCounts = () => {
    const completedTasks = tasksList.filter((task) => task.completed).length;
    const uncompletedTasks = tasksList.length - completedTasks;
    return { completedTasks, uncompletedTasks };
  };

  const { completedTasks, uncompletedTasks } = getTaskCounts();

  return (
    <main>
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList
        tasksList={tasksList}
        editTask={editTask}
        deleteTask={deleteTask}
        uncompletedTasks={uncompletedTasks}
      />
      <Footer completedTasks={completedTasks} />
    </main>
  );
};
