import { Getter } from "vuex";
import { IUiState } from "../types/ui.interface";

export const getActiveBgTheme: Getter<IUiState, any> = (state) => {
	return `bg-${state.activeTheme}`;
};

export const getActiveTextTheme: Getter<IUiState, any> = (state) => {
	return `text-${state.activeTheme}`;
};

export const getActiveBorderTheme: Getter<IUiState, any> = (state) => {
	return `border-${state.activeTheme}`;
};
