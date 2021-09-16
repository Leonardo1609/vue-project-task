import { Action } from "vuex";
import { IProject, ITask } from "../types/project.interface";
import { IProjectState } from "../types/state.interface";
import slug from "slug";
import { db } from "@/firebase/db";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const setTasksByProyectId: Action<IProjectState, any> = async ({
	commit,
	state,
	rootState,
}) => {
	const activeProjectId = state.activeProjectId;
	const userId = rootState.auth.user.uid;
	commit("setLoadingTasks", true);
	const querySnapshot = await getDocs(
		collection(
			db,
			`${userId}/project-task/projects/${activeProjectId}/tasks`
		)
	);
	const tasks: ITask[] = [];
	querySnapshot.forEach((doc) => {
		tasks.push({
			...(doc.data() as ITask),
			id: doc.id,
		});
	});
	commit("setTasks", tasks);
	commit("setLoadingTasks", false);
};

export const addNewTask: Action<IProjectState, any> = async (
	{ commit, state, rootState },
	description: any
) => {
	const activeProjectId = state.activeProjectId;
	const userId = rootState.auth.user.uid;
	let newTask: ITask = {
		projectId: activeProjectId,
		description,
		loadingChange: false,
		done: false,
	};

	const docRef = await addDoc(
		collection(
			db,
			`${userId}/project-task/projects/${activeProjectId}/tasks`
		),
		newTask
	);

	newTask = {
		...newTask,
		id: docRef.id,
	};

	commit("addNewTask", newTask);
};
export const updateTask: Action<IProjectState, any> = async (
	{ commit, state, rootState },
	{
		taskId,
		property,
		value,
	}: {
		taskId: string;
		property: "done" | "description";
		value: boolean | string;
	}
) => {
	const activeProjectId = state.activeProjectId;
	const userId = rootState.auth.user.uid;
	commit("setLoadingTaskChange", { taskId, loadingChange: true });
	const taskDoc = doc(
		db,
		`${userId}/project-task/projects/${activeProjectId}/tasks/${taskId}`
	);
	await updateDoc(taskDoc, {
		[property]: value
	})

	commit("updateTask", { taskId, property, value });
	commit("setLoadingTaskChange", { taskId, loadingChange: false });
};

export const addNewProject: Action<IProjectState, any> = async (
	{ commit, rootState },
	projectName: string
) => {
	const userId = rootState.auth.user.uid;
	let project: IProject = {
		name: projectName,
		slug: slug(projectName),
	};

	const docRef = await addDoc(
		collection(db, `${userId}/project-task/projects`),
		project
	);

	project = {
		...project,
		id: docRef.id,
	};

	commit("addNewProject", project);
};

export const setProjects: Action<IProjectState, any> = async ({
	commit,
	rootState,
}) => {
	const userId = rootState.auth.user.uid;
	const docRef = collection(db, `${userId}/project-task/projects`);
	const querySnapshot = await getDocs(docRef);
	const projects: IProject[] = [];
	querySnapshot.forEach((doc) => {
		projects.push({
			...(doc.data() as IProject),
			id: doc.id,
		});
	});
	commit("setProjects", projects);
};
