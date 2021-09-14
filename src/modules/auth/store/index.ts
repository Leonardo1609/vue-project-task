import { Module } from "vuex";
import { IAuthState } from "../types/state.interface";
import state from "./state";
import * as actions from "./actions";
// import * as getters from "./getters";
import * as mutations from "./mutations";

const authModule: Module<IAuthState, any> = {
	namespaced: true,
	state,
	actions,
	// getters,
	mutations,
};

export default authModule;
