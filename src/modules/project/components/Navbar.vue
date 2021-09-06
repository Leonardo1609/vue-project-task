<template>
	<nav class="w-100">
		<div class="container flex justify-between mx-auto">
			<h1 class="text-white font-bold text-xl">Hello Leonardo</h1>
			<button
				:class="getActiveBgTheme"
				class="rounded-full text-gray-900 text-lg py-1 px-3"
			>
				<i class="fas fa-sign-out-alt"></i>
			</button>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Navbar",
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
	},
};
</script>

<style></style>
