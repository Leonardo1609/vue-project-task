import { Mutation } from "vuex";
import { IProjectState } from "../types/state.interface";
import { IProject, ITask } from "../types/project.interface";

export const setActiveProjectId: Mutation<IProjectState> = (
	state,
	projectId: string
) => {
	state.activeProjectId = projectId;
};

export const setLoadingTasks: Mutation<IProjectState> = (
	state,
	value: boolean
) => {
	state.loadingTasks = value;
};

export const setLoadingTaskChange: Mutation<IProjectState> = (
	state,
	{ taskId, loadingChange }: { taskId: string; loadingChange: boolean }
) => {
	state.tasks = state.tasks.map((task) => {
		if (task.id === taskId) {
			return {
				...task,
				loadingChange,
			};
		}
		return task;
	});
};

export const updateTask: Mutation<IProjectState> = (
	state,
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
	state.tasks = state.tasks.map((task) => {
		if (task.id === taskId) {
			return {
				...task,
				[property]: value,
			};
		}
		return task;
	});
};

export const addNewProject: Mutation<IProjectState> = (
	state,
	project: IProject
) => {
	state.projects = [project, ...state.projects];
};

export const addNewTask: Mutation<IProjectState> = (state, task: ITask) => {
	state.tasks = [task, ...state.tasks];
};
