import { Module } from "vuex";
import { IProjectState } from "../types/state.interface";
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

const projectModule: Module<IProjectState, any> = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};

export default projectModule;
