import { IProject, ITask } from "./project.interface";

export interface IProjectState {
	loadingTasks: boolean;
	projects: IProject[];
	tasks: ITask[];
	activeProjectId: string;
	addingTask: boolean;
	addingProject: boolean;
}
