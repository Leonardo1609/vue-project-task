<template>
	<router-link
		:class="activeClass"
		class="block rounded-full px-5 py-3 text-white text-left text-base"
		@click="setActiveProjectId(project.id)"
		:to="{
			name: 'project-view',
			params: {
				slug: project.slug,
			},
		}"
		>{{ project.name }}</router-link
	>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IProject } from "@/modules/project/types/project.interface";
import { mapGetters, mapMutations, mapState } from "vuex";

export default defineComponent({
	name: "ProjectItem",
	props: {
		project: {
			type: Object as PropType<IProject>,
			required: true,
		},
	},
	methods: {
		...mapMutations("project", ["setActiveProjectId"]),
	},
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
		...mapState("project", ["activeProjectId"]),
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
