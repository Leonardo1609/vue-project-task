import { IUser } from "./user.interface";

export interface IAuthState {
	loadingUser: boolean;
	authenticated: boolean;
	user: IUser | null;
}
