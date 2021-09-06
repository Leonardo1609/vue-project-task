import { IProject, ITask } from "./project.interface";

export interface IProjectState {
	projects: IProject[];
	tasks: ITask[];
	activeProjectId: string;
}
