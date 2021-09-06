import { Module } from "vuex";
import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";

const projectModule: Module<any, any> = {
	namespaced: true,
	state,
	getters,
	mutations,
};

export default projectModule;
