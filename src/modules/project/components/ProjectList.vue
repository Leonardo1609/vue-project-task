<template>
	<div>
		<div class="flex justify-between pr-1">
			<h1 class="text-xl text-left font-bold text-white">
				<i class="fas fa-th-list mr-3"></i>
				Project List
			</h1>
			<ThemeActivator />
		</div>
		<div class="mt-10 pr-1">
			<ProjectInput
				v-model:search-term="searchTerm"
				v-model:add-term="addTerm"
				@add-project="addProject"
			/>
		</div>
		<div
			class="projects-container mt-10 pr-1"
			v-if="filteredProjects.length"
		>
			<div
				class="mb-2"
				v-for="project in filteredProjects"
				:key="project.id"
			>
				<ProjectItem :project="project" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
import { defineAsyncComponent, defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { IProject } from "../types/project.interface";

export default defineComponent({
	name: "ProjectList",
	data() {
		return {
			searchTerm: "",
			addTerm: "",
			toast: useToast(),
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
				/* webpackChunkName: "ThemeActivator" */ "@/components/ThemeActivator.vue"
			)
		),

		ProjectInput: defineAsyncComponent(() =>
			import(
				/* webpackChunkName: "ProjectInput" */ "../components/ProjectInput.vue"
			)
		),
	},
	computed: {
		...mapState("project", ["addingProject"]),
		...mapGetters("project", ["getProjectsByTerm", "getProjectByName"]),
		filteredProjects(): IProject[] {
			return this.getProjectsByTerm(this.searchTerm);
		},
	},
	methods: {
		...mapActions("project", ["addNewProject"]),
		async addProject() {
			if (
				this.getProjectByName(this.addTerm.trim()) ||
				this.addTerm.trim() === "" ||
				this.addingProject
			) {
				return;
			}
			await this.addNewProject(this.addTerm.trim());
			this.toast.success(this.addTerm + " added successfully");
			this.addTerm = "";
		},
	},
});
</script>
<style scoped>
.projects-container {
	height: calc(100vh - 250px);
	overflow: auto;
}
::-webkit-scrollbar {
	width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px grey;
	border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: gray;
	border-radius: 10px;
}
</style>
