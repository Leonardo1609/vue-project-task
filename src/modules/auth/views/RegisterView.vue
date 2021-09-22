<template>
	<form
		@submit.prevent="createUser"
		class="w-3/4 md:w-2/4 lg:w-1/4 px-10 py-14  bg-gray-900 rounded-xl relative"
	>
		<h1 class="text-white font-bold text-2xl mb-10">Sign up</h1>
		<div class="absolute right-5 top-5">
			<ThemeActivator />
		</div>
		<div class="flex flex-col mb-8">
			<label class="text-left text-sm text-white mb-1 ml-2" for="username"
				>Username</label
			>
			<input
				id="username"
				class="py-2 px-3 outline-none bg-gray-700 rounded-xl text-white"
				type="text"
				placeholder="Username"
				v-model="formValue.username"
			/>
		</div>
		<div class="flex flex-col mb-8">
			<label class="text-left text-sm text-white mb-1 ml-2" for="email"
				>Email</label
			>
			<input
				id="email"
				type="email"
				class="py-2 px-3 outline-none bg-gray-700 rounded-xl text-white"
				placeholder="Email"
				v-model="formValue.email"
			/>
		</div>
		<div class="flex flex-col mb-8">
			<label class="text-left text-sm text-white mb-1 ml-2" for="password"
				>Password</label
			>
			<input
				id="password"
				class="py-2 px-3 outline-none bg-gray-700 rounded-xl text-white"
				type="password"
				placeholder="Password"
				v-model="formValue.password"
			/>
		</div>
		<div class="flex flex-col mb-8">
			<label class="text-left text-sm text-white mb-1 ml-2" for="confirm"
				>Confirm Password</label
			>
			<input
				id="confirm"
				class="py-2 px-3 outline-none bg-gray-700 rounded-xl text-white"
				type="password"
				placeholder="Confirm Password"
				v-model="formValue.confirmPassword"
			/>
		</div>
		<button
			:class="getActiveBgTheme"
			class="w-full rounded-xl text-white text-lg py-2 px-5 mt-5"
		>
			Create Account
		</button>
		<div class="mt-5">
			<router-link class="text-white text-sm" :to="{ name: 'login' }"
				>I've just remembered my account</router-link
			>
		</div>
	</form>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { defineComponent, defineAsyncComponent } from "vue";
import { IRegisterUser } from "../types/user.interface";

export default defineComponent({
	name: "RegisterView",
	data() {
		return {
			formValue: {
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			} as IRegisterUser,
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
		...mapActions("auth", ["registerUser"]),
		async createUser() {
			await this.registerUser(this.formValue);
		},
	},
});
</script>

<style></style>
