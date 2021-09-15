import { firebaseAuth } from "@/firebase/db";
import { IUser } from "@/modules/auth/types/user.interface";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationGuard } from "vue-router";
import store from "../store";

export const verifyAuthentication: NavigationGuard = (to, from, next) => {
	onAuthStateChanged(firebaseAuth, (user) => {
		if (user) {
			store.commit("auth/setUser", {
				uid: user.uid,
				username: user.displayName,
				email: user.email,
			} as IUser);
			next();
		} else {
			store.commit("auth/setUser", null);
			next({ name: "login" });
		}
	});
};
