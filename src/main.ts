import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions: PluginOptions = {
	position: POSITION.TOP_RIGHT,
};

createApp(App)
	.use(Toast, toastOptions)
	.use(store)
	.use(router)
	.mount("#app");
