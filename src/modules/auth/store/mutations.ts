import { Mutation } from "vuex";
import { IAuthState } from "../types/state.interface";
import { IUser } from "../types/user.interface";

export const setUser: Mutation<IAuthState> = (state, payload: IUser | null) => {
	state.user = payload;
	state.authenticated = payload ? true : false;
};

export const setLoadingUser: Mutation<IAuthState> = (
	state,
	loading: boolean
) => {
	state.loadingUser = loading;
};

export const logoutUser: Mutation<IAuthState> = (state) => {
	state.loadingUser = false;
	state.authenticated = false;
	state.user = null;
};
