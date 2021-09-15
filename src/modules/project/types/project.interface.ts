export interface IProject {
	id?: string;
	name: string;
	slug: string;
}

export interface ITask {
	description: string;
	done: boolean;
	id?: string;
	loadingChange: boolean;
	projectId: string;
}
