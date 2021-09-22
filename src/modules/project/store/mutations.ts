import { Mutation } from "vuex";
import { IProjectState } from "../types/state.interface";
import { IProject, ITask } from "../types/project.interface";
import { initialProjectState } from "./state";

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

export const setProjects: Mutation<IProjectState> = (
	state,
	projects: IProject[]
) => {
	state.projects = [...projects];
};

export const setTasks: Mutation<IProjectState> = (state, tasks: ITask[]) => {
	state.tasks = [...tasks];
};

export const removeTask: Mutation<IProjectState> = (state, taskId: string) => {
	state.tasks = state.tasks.filter((task) => task.id !== taskId);
};

export const updateProject: Mutation<IProjectState> = (
	state,
	project: IProject
) => {
	state.projects = state.projects.map((proj) => {
		if (proj.id === project.id) {
			return project;
		}
		return proj;
	});
};

export const removeProject: Mutation<IProjectState> = (
	state,
	projectId: string
) => {
	state.projects = state.projects.filter(
		(project) => project.id !== projectId
	);
};

export const setAddingTask: Mutation<IProjectState> = (
	state,
	value: boolean
) => {
	state.addingTask = value;
};

export const setAddingProject: Mutation<IProjectState> = (
	state,
	value: boolean
) => {
	state.addingProject = value;
};

export const cleanTasks: Mutation<IProjectState> = (state) => {
	state.tasks = []
};
