import { Module } from "vuex";
import { IUiState } from "../types/ui.interface";

import state from "@/modules/ui/store/state";
import * as mutations from "../store/mutations";
import * as getters from "../store/getters";

const uiModule: Module<IUiState, any> = {
	namespaced: true,
	state,
	mutations,
	getters,
};

export default uiModule;
