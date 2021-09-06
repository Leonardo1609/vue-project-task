<template>
	<div class="flex">
		<div class="w-2/6 p-10 bg-gray-800 h-screen">
			<ProjectList />
		</div>
		<div class="w-4/6 p-10 bg-gray-900 overflow-auto">
			<Navbar />
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
	components: {
		Navbar: defineAsyncComponent(() =>
			import(/* webpackChunkName "Navbar" */ "../components/Navbar")
		),
		ProjectList: defineAsyncComponent(() =>
			import(
				/* webpackChunkName "ProjectList" */ "../components/ProjectList.vue"
			)
		),
	},
};
</script>

<style></style>
