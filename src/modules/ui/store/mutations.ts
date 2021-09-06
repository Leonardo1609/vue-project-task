import { Mutation } from "vuex";
import { IUiState } from "../types/ui.interface";

export const setActiveTheme: Mutation<IUiState> = (state) => {
	if (state.activeTheme === "purple-500") {
		state.activeTheme = "pink-400";
	} else {
		state.activeTheme = "purple-500";
	}
};
