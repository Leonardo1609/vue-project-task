import { Action } from "vuex";
import { IProject, ITask } from "../types/project.interface";
import { IProjectState } from "../types/state.interface";
import slug from "slug";

export const setTasksByProyectId: Action<IProjectState, any> = async (
	{ commit },
	id: string
) => {
	commit("setLoadingTasks", true);
	console.log(id);
	// http request
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
	{ commit },
	projectName: string
) => {
	// http post
	const project: IProject = {
		id: "",
		name: projectName,
		slug: slug(projectName),
	};

	commit("addNewProject", project);
};
