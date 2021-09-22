import { Getter } from "vuex";
import { IProject } from "../types/project.interface";
import { IProjectState } from "../types/state.interface";

export const getProjectsByTerm: Getter<IProjectState, any> = (state) => (
	term: string
): IProject[] => {
	if (!term) return state.projects;
	return state.projects.filter((project) =>
		project.name.toLowerCase().includes(term.toLowerCase())
	);
};

export const getProjectByName: Getter<IProjectState, any> = (state) => (
	name: string
): IProject | undefined => {
	const project = state.projects.find((project) => project.name === name);
	return project;
};

export const getProjectBySlug: Getter<IProjectState, any> = (state) => (
	slug: string
): IProject | undefined | boolean => {
	return state.projects.find((project) => project.slug === slug);
};

export const getTasks: Getter<IProjectState, any> = (state) => {
	return [
		...state.tasks.filter((task) => task.done),
		...state.tasks.filter((task) => !task.done),
	];
};

export const getProjectProgress: Getter<IProjectState, any> = (state) => {
	const tasksQuantity = state.tasks.length;
	const tasksDone = state.tasks.filter((task) => task.done).length;

	return (tasksDone / tasksQuantity) * 100;
};
