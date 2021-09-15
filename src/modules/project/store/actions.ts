import { Action } from "vuex";
import { IProject, ITask } from "../types/project.interface";
import { IProjectState } from "../types/state.interface";
import slug from "slug";
import { db } from "@/firebase/db";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const setTasksByProyectId: Action<IProjectState, any> = async (
	{ commit },
	id: string
) => {
	commit("setLoadingTasks", true);
	console.log(id);
	commit("setLoadingTasks", false);
};

export const addNewTask: Action<IProjectState, any> = async (
	{ commit, state },
	description: any
) => {
	const newTask: ITask = {
		id: "",
		projectId: state.activeProjectId,
		description,
		loadingChange: false,
		done: false,
	};

	commit("addNewTask", newTask);
};
export const updateTask: Action<IProjectState, any> = async (
	{ commit },
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
	commit("setLoadingTaskChange", { taskId, loadingChange: true });
	setTimeout(() => {
		commit("updateTask", { taskId, property, value });
		commit("setLoadingTaskChange", { taskId, loadingChange: false });
	}, 3000);
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
