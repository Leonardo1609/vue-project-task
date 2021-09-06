<template>
	<div>
		<div class="flex justify-between">
			<h1 class="text-xl text-left font-bold text-white">
				<i class="fas fa-th-list mr-3"></i>
				Project List
			</h1>
			<ThemeActivator />
		</div>
		<div class="mt-10">
			<ProjectInput
				v-model:search-term="searchTerm"
				v-model:add-term="addTerm"
			/>
		</div>
		<div class="projects-container mt-10">
			<div
				class="mt-2"
				v-for="project in filteredProjects"
				:key="project.id"
			>
				<ProjectItem :project="project" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import { IProject } from "../types/project.interface";

export default defineComponent({
	name: "ProjectList",
	data() {
		return {
			searchTerm: "",
			addTerm: "",
		};
	},
	components: {
		ProjectItem: defineAsyncComponent(() =>
			import(
				/* webpackChunkName: "ProjectItem" */ "../components/ProjectItem.vue"
			)
		),
		ThemeActivator: defineAsyncComponent(() =>
			import(
				/* webpackChunkName: "ThemeActivator" */ "../components/ThemeActivator.vue"
			)
		),

		ProjectInput: defineAsyncComponent(() =>
			import(
				/* webpackChunkName: "ProjectInput" */ "../components/ProjectInput.vue"
			)
		),
	},
	computed: {
		...mapGetters("project", ["getProjectsByTerm"]),
		filteredProjects(): IProject[] {
			return this.getProjectsByTerm(this.searchTerm);
		},
	},
});
</script>
