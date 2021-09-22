<template>
	<div class="flex flex-col md:flex-row">
		<div class="md:w-3/6 lg:w-2/6 p-10 bg-gray-800 h-screen">
			<ProjectList />
		</div>
		<div class="md:w-3/6 lg:w-4/6 p-10 bg-gray-900 overflow-auto">
			<div class="mb-5">
				<Navbar />
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions } from "vuex";
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
	methods: {
		...mapActions("project", ["setProjects"]),
	},
	async created() {
		await this.setProjects();
	},
};
</script>

<style></style>
