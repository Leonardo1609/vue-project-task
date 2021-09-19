<template>
	<router-link
		:class="activeClass"
		class="block rounded-xl px-5 py-3 text-white text-left text-base flex justify-between"
		@click="setActiveProjectId(project.id)"
		:to="{
			name: 'project-view',
			params: {
				slug: project.slug,
			},
		}"
	>
		<input
			type="text"
			@blur="saveProject"
			@keypress.enter="saveProject"
			:disabled="!isEditing"
			ref="projectInput"
			v-model="projectName"
			:class="!isEditing && 'cursor-pointer'"
			class="flex-1 border-none outline-none bg-transparent mr-5"
		/>
		<div v-if="isProjectActive && !isEditing">
			<i class="fas fa-pencil-alt mr-3" @click="startEditing"></i>
			<i @click="deleteProject" class="far fa-trash-alt"></i>
		</div>
		<div v-if="isProjectActive && isEditing">
			<i class="far fa-save" @click="saveProject"></i>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IProject } from "@/modules/project/types/project.interface";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { useToast } from "vue-toastification";

export default defineComponent({
	name: "ProjectItem",
	data() {
		return {
			projectName: this.project.name,
			isEditing: false,
			toast: useToast(),
		};
	},
	props: {
		project: {
			type: Object as PropType<IProject>,
			required: true,
		},
	},
	methods: {
		...mapMutations("project", ["setActiveProjectId"]),
		...mapActions("project", ["removeProject", "updateProject"]),
		async deleteProject() {
			await this.removeProject();
			this.$router.push({ name: "no-project" });
		},
		startEditing() {
			this.isEditing = true;
			setTimeout(() => {
				(this.$refs.projectInput as HTMLInputElement).focus();
			});
		},
		async saveProject($event: Event) {
			$event.stopPropagation();
			if (this.projectName === "") {
				// reset
				this.projectName = this.project.name;
			} else if (
				this.projects.find(
					(project: IProject) => project.name === this.projectName
				) &&
				this.projectName !== this.project.name
			) {
				this.toast.error("The Project already exists");
				// reset
				this.projectName = this.project.name;
			} else if (this.projectName !== this.project.name) {
				const slug = await this.updateProject({
					id: this.project.id,
					name: this.projectName,
				});
				this.$router.replace({
					name: "project-view",
					params: { slug },
				});
			}
			this.isEditing = false;
		},
	},
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
		...mapState("project", ["activeProjectId", "projects"]),
		isProjectActive() {
			return this.activeProjectId === this.project.id;
		},
		activeClass() {
			return this.isProjectActive && this.getActiveBgTheme;
		},
	},
});
</script>

<style scoped></style>
