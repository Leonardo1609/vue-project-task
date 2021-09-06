import { Mutation } from "vuex";
import { IProjectState } from "../types/state.interface";

export const setActiveProjectId: Mutation<IProjectState> = (
	state,
	projectId: string
) => {
	state.activeProjectId = projectId;
};
