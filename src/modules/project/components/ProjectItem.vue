<template>
	<router-link
		:class="activeClass"
		class="rounded-xl px-5 py-3 text-white text-left text-base flex"
		@click="chooseProject"
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
			class="border-none outline-none bg-transparent w-5/6"
		/>
		<div
			class="flex items-center justify-center w-1/6"
			v-if="isProjectActive && !isEditing"
		>
			<i class="fas fa-pencil-alt mr-3" @click="startEditing"></i>
			<i class="far fa-trash-alt" @click="deleteProject"></i>
		</div>
		<div
			class="flex items-center justify-center w-1/6"
			v-if="isProjectActive && isEditing"
		>
			<i class="far fa-save" @click="saveProject"></i>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IProject } from "@/modules/project/types/project.interface";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { useToast } from "vue-toastification";
import Swal from "sweetalert2";

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
		...mapMutations("project", ["setActiveProjectId", "cleanTasks"]),
		...mapActions("project", ["removeProject", "updateProject"]),
		chooseProject() {
			this.setActiveProjectId(this.project.id);
		},
		startEditing() {
			this.isEditing = true;
			setTimeout(() => {
				(this.$refs.projectInput as HTMLInputElement).focus();
			});
		},

		async saveProject($event: Event) {
			$event.stopPropagation();

			if (
				this.projectName.trim() === "" ||
				this.projectName.trim() === this.project.name
			) {
				// reset
				this.projectName = this.project.name;
			} else if (
				this.projects.find(
					(project: IProject) =>
						project.name === this.projectName.trim()
				) &&
				this.projectName.trim() !== this.project.name
			) {
				this.toast.error("The Project already exists");
				// reset
				this.projectName = this.project.name;
			} else if (this.projectName.trim() !== this.project.name) {
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
		async deleteProject() {
			const { isConfirmed } = await Swal.fire({
				title: "Are you sure?",
				icon: "error",
				text: "This action can't be reversed",
				showCancelButton: true,
				confirmButtonText: "Yes",
				cancelButtonText: "Cancel",
			});
			if (isConfirmed) {
				Swal.fire({
					text: "Wait please!!",
					allowOutsideClick: true,
				});

				Swal.showLoading();
				await this.removeProject();
				this.$router.push({ name: "no-project" });
				Swal.fire("Deleted", "success");
			}
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
