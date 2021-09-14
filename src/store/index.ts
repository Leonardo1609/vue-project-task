import { createStore } from "vuex";

import project from "@/modules/project/store";
import ui from "@/modules/ui/store";
import auth from "@/modules/auth/store";

export default createStore({
	modules: {
		auth,
		project,
		ui,
	},
});
