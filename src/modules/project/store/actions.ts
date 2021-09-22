import { Action } from "vuex";
import { IProject, ITask } from "../types/project.interface";
import { IProjectState } from "../types/state.interface";
import slug from "slug";
import { db } from "@/firebase/db";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	query,
	updateDoc,
	where,
} from "firebase/firestore";

export const setTasksByProyectId: Action<IProjectState, any> = async ({
	commit,
	state,
	rootState,
}) => {
	commit("cleanTasks");
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
	description: string
) => {
	commit("setAddingTask", true);
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
	commit("setAddingTask", false);
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
		[property]: value,
	});

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

	commit("setAddingProject", true);
	const docRef = await addDoc(
		collection(db, `${userId}/project-task/projects`),
		project
	);

	project = {
		...project,
		id: docRef.id,
	};

	commit("addNewProject", project);
	commit("setAddingProject", false);
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

export const removeTask: Action<IProjectState, any> = async (
	{ commit, rootState, state },
	taskId: string
) => {
	const activeProjectId = state.activeProjectId;
	const userId = rootState.auth.user.uid;
	commit("setLoadingTaskChange", { taskId, loadingChange: true });
	await deleteDoc(
		doc(
			db,
			`${userId}/project-task/projects/${activeProjectId}/tasks/${taskId}`
		)
	);
	commit("removeTask", taskId);
	commit("setLoadingTaskChange", { taskId, loadingChange: false });
};

export const removeProject: Action<IProjectState, any> = async ({
	commit,
	state,
	rootState,
}) => {
	const activeProjectId = state.activeProjectId;
	const userId = rootState.auth.user.uid;
	await deleteDoc(
		doc(db, `${userId}/project-task/projects/${activeProjectId}`)
	);
	commit("removeProject", activeProjectId);
};

export const updateProject: Action<IProjectState, any> = async (
	{ commit, rootState },
	{ id, name }: Partial<IProject>
) => {
	const userId = rootState.auth.user.uid;
	const slugged = slug(name!);
	const dataToUpdate: Partial<IProject> = {
		name,
		slug: slugged,
	};

	await updateDoc(
		doc(db, `${userId}/project-task/projects/${id}`),
		dataToUpdate
	);

	commit("updateProject", {
		id,
		...dataToUpdate,
	});
	return slugged;
};

export const searchProjectBySlug: Action<IProjectState, any> = async (
	{ rootState },
	slug: string
) => {
	const userId = rootState.auth.user.uid;
	const projectsRef = collection(db, `${userId}/project-task/projects/`);

	const querySnapshot = await getDocs(
		query(projectsRef, where("slug", "==", slug), limit(1))
	);
	const projects: IProject[] = [];
	querySnapshot.forEach((doc) => {
		projects.push({
			...(doc.data() as IProject),
			id: doc.id,
		});
	});

	return projects[0];
};
