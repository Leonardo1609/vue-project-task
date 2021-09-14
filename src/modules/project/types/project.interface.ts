export interface IProject {
	id: string;
	name: string;
	slug: string;
}

export interface ITask {
	projectId: string;
	id: string;
	description: string;
	done: boolean;
	loadingChange: boolean;
}
