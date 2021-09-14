import { firebaseAuth } from "@/firebase/db";
import { IUser } from "@/modules/auth/types/user.interface";
import { onAuthStateChanged } from "firebase/auth";
import store from "../store";

export const verifyAuthentication = () => {
	onAuthStateChanged(firebaseAuth, (user) => {
		if (user) {
			store.commit("auth/setUser", {
				username: user.displayName,
				email: user.email,
			} as IUser);
		} else {
			store.commit("auth/setUser", null);
		}
	});
};
