import { IProjectState } from "../types/state.interface";

export default (): IProjectState => ({
	projects: [
		{
			id: "1",
			name: "Project 1",
			slug: "project_1",
		},
		{
			id: "2",
			name: "Project 2",
			slug: "project_2",
		},
	],
	activeProjectId: "1",
	tasks: [
		{
			projectId: "1",
			id: "1",
			description: "Task 1",
			done: false,
		},
		{
			projectId: "1",
			id: "2",
			description: "Task 2",
			done: true,
		},
	],
});
