<template>
	<div
		class="flex items-center relative cursor-pointer"
		@click="setActiveTheme"
	>
		<div
			:class="inactiveThemeClass"
			class="theme-selector rounded-full absolute right-4 z-0"
		></div>
		<div
			:class="getActiveBgTheme"
			class="theme-selector rounded-full z-10"
		></div>
	</div>
</template>

<script lang="ts">
import { mapGetters, mapMutations, mapState } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ThemeActivator",
	computed: {
		...mapState("ui", ["activeTheme"]),
		...mapGetters("ui", ["getActiveBgTheme"]),
		inactiveThemeClass(): string {
			return this.activeTheme === "purple-500"
				? "bg-pink-400"
				: "bg-purple-500";
		},
	},
	methods: {
		...mapMutations("ui", ["setActiveTheme"]),
	},
});
</script>

<style scoped>
.theme-selector {
	height: 25px;
	width: 25px;
}
</style>
