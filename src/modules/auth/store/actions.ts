import { firebaseAuth } from "@/firebase/db";
import router from "@/router";
import { FirebaseError } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { Action } from "vuex";
import { IAuthState } from "../types/state.interface";
import { ILoginUser, IRegisterUser, IUser } from "../types/user.interface";

export const registerUser: Action<IAuthState, any> = async (
	{ dispatch },
	payload: IRegisterUser
) => {
	try {
		await createUserWithEmailAndPassword(
			firebaseAuth,
			payload.email,
			payload.password
		);

		const user = firebaseAuth.currentUser!;
		await updateProfile(user, { displayName: payload.username });
		await dispatch("loginUser", {
			email: payload.email,
			password: payload.password,
		});
	} catch (err) {
		if (err instanceof FirebaseError) {
			console.log(err.message);
		}
	}
};

export const loginUser: Action<IAuthState, any> = async (
	{ commit },
	payload: ILoginUser
) => {
	try {
		const { user } = await signInWithEmailAndPassword(
			firebaseAuth,
			payload.email,
			payload.password
		);
		commit("setUser", {
			uid: user.uid,
			username: user.displayName,
			email: user.email,
		} as IUser);
		router.push({ name: "projects" });
	} catch (err) {
		if (err instanceof FirebaseError) {
			console.log(err.message);
		}
	}
};

export const logoutUser: Action<IAuthState, any> = async ({ commit }) => {
	await signOut(firebaseAuth);
	commit("logoutUser");
};
