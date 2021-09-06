import { createStore } from "vuex";

import project from "@/modules/project/store";
import ui from "@/modules/ui/store";

export default createStore({
	modules: {
		project,
		ui,
	},
});
