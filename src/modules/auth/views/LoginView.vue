<template>
	<form
		@submit.prevent="login"
		class="w-3/4 md:w-2/4 lg:w-1/4 px-10 py-14  bg-gray-900 rounded-xl"
	>
		<h1 class="text-white font-bold text-2xl mb-10">Login</h1>
		<div class="absolute right-5 top-5">
			<ThemeActivator />
		</div>
		<div class="flex flex-col">
			<label class="text-left text-sm text-white mb-1 ml-2" for="email"
				>Email</label
			>
			<input
				id="email"
				type="email"
				class="py-2 px-3 outline-none bg-gray-700 rounded-xl text-white mb-5"
				v-model="formValue.email"
				placeholder="Email"
			/>
		</div>
		<div class="flex flex-col">
			<label class="text-left text-sm text-white mb-1 ml-2" for="password"
				>Password</label
			>
			<input
				id="password"
				class="py-2 px-3 outline-none bg-gray-700 rounded-xl text-white mb-5"
				type="password"
				v-model="formValue.password"
				placeholder="Password"
			/>
		</div>
		<button
			:class="getActiveBgTheme"
			class="w-full rounded-xl text-white text-lg py-2 px-5 mt-10"
		>
			Login
		</button>
	</form>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { defineAsyncComponent, defineComponent } from "vue";
import { ILoginUser } from "../types/user.interface";

export default defineComponent({
	name: "LoginView",
	data() {
		return {
			formValue: {
				email: "leonardo@gmail.com",
				password: "123123",
			} as ILoginUser,
		};
	},
	components: {
		ThemeActivator: defineAsyncComponent(() =>
			import(
				/* webpackChunkName: "ThemeActivator" */ "@/components/ThemeActivator.vue"
			)
		),
	},
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
	},
	methods: {
		...mapActions("auth", ["loginUser"]),
		async login() {
			await this.loginUser(this.formValue);
		},
	},
});
</script>

<style></style>
