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
