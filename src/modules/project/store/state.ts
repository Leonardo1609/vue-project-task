import { IProjectState } from "../types/state.interface";

export default (): IProjectState => ({
	loadingTasks: false,
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
	activeProjectId: "",
	tasks: [
		{
			projectId: "1",
			id: "1",
			description: "Task 1",
			done: false,
			loadingChange: false,
		},
		{
			projectId: "1",
			id: "2",
			description: "Task 2",
			done: true,
			loadingChange: false,
		},
		{
			projectId: "1",
			id: "3",
			description: "Task 3",
			done: false,
			loadingChange: false,
		},
		{
			projectId: "1",
			id: "4",
			description: "Task 4",
			done: true,
			loadingChange: false,
		},
	],
});
