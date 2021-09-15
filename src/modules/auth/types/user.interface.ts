export interface IUser {
	uid: string;
	email: string;
	username: string;
}

export interface IRegisterUser {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface ILoginUser {
	email: string;
	password: string;
}
