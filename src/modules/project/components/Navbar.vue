<template>
	<nav class="w-100 px-10">
		<div class="container flex justify-between mx-auto">
			<h2 class="text-white font-bold text-xl">
				Hello <template v-if="user">{{ user.username }}</template>
			</h2>
			<button
				:class="getActiveBgTheme"
				class="rounded-full text-gray-900 text-lg py-1 px-3"
				@click="logoutUser"
			>
				<i class="fas fa-sign-out-alt"></i>
			</button>
		</div>
	</nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
	name: "Navbar",
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
		...mapState("auth", ["user"]),
	},
	methods: {
		...mapActions("auth", ["logoutUser"]),
	},
};
</script>

<style></style>
