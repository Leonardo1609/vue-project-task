import { IAuthState } from "../types/state.interface";

export default (): IAuthState => ({
	loadingUser: false,
	authenticated: false,
	user: null,
});
