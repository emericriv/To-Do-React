/* eslint-disable react/no-unescaped-entities */
// Ce composant est utilisé pour afficher la liste des tâches.

import { TaskItem } from "../taskItem/taskItem";
import styles from "./taskList.module.css";

export const TaskList = ({
	tasksList,
	editTask,
	deleteTask,
	uncompletedTasks,
}) => {
	const taskList = tasksList.map((task) => (
		<TaskItem
			key={task.id}
			task={task}
			editTask={editTask}
			deleteTask={deleteTask}
		/>
	));

	if (taskList && taskList.length > 0) {
		return (
			<div className="box">
				<h2 className={styles.title}>
					{uncompletedTasks > 0 && (
						<>
							📄 Il te reste encore{" "}
							<span className="important">
								{uncompletedTasks}
							</span>{" "}
							tâches à accomplir
						</>
					)}
					{uncompletedTasks === 0 && (
						<>🤝 Génial, tu as accompli toutes tes tâches !</>
					)}
				</h2>
				{tasksList && tasksList.length > 0 && (
					<ul className={styles.container}>{taskList}</ul>
				)}
			</div>
		);
	}

	return (
		<div className="box">
			<h2 className={styles.emptyState}>
				👋 Salut, Tu n'as rien à faire ! Profites de ton temps libre !
			</h2>
		</div>
	);
};
