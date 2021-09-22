import { IProjectState } from "../types/state.interface";

export const initialProjectState: IProjectState = {
	loadingTasks: false,
	projects: [],
	activeProjectId: "",
	tasks: [],
	addingTask: false,
	addingProject: false,
};
export default (): IProjectState => ({
	...initialProjectState,
});
