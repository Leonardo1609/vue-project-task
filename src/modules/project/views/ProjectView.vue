<template>
	<div class="px-10 ">
		<h2 v-if="currentProject" class="text-white font-bold text-2xl mb-6">
			Tasks of {{ currentProject.name }}
		</h2>

		<h3 class="mb-5 text-white" v-if="projectTasks.length === 0">
			No tienes tareas en este proyecto, agrega alguna
		</h3>
		<form class="flex" @submit.prevent="submitNewTask">
			<input
				type="text"
				v-model="newTask"
				class="w-full rounded-tl-xl rounded-bl-xl outline-none border-none px-5 text-lg bg-gray-700 text-white"
				placeholder="Agregar nueva tarea"
			/>
			<button
				:class="getActiveBgTheme"
				class="flex-1 rounded-tr-xl rounded-br-xl text-white text-lg py-2 px-5"
			>
				<i class="fas fa-plus"></i>
			</button>
		</form>
		<div></div>
		<ul class="mt-10">
			<li class="text-white" v-for="task in projectTasks" :key="task.id">
				<TaskInput :task="task" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { IProject, ITask } from "../types/project.interface";
export default defineComponent({
	name: "ProjectView",
	components: {
		TaskInput: defineAsyncComponent(() =>
			import(
				/* webpackChunkName "TaskInput" */ "@/modules/project/components/TaskInput.vue"
			)
		),
	},
	props: {
		slug: {
			type: String as PropType<string>,
			required: true,
		},
	},
	data() {
		return {
			newTask: "",
		};
	},
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
		...mapGetters("project", ["getProjectBySlug", "getTasks"]),
		currentProject(): IProject {
			return this.getProjectBySlug(this.slug);
		},
		projectTasks(): ITask[] {
			return this.getTasks;
		},
	},
	methods: {
		...mapMutations("project", ["setActiveProjectId"]),
		...mapActions("project", ["setTasksByProyectId", "addNewTask"]),
		async submitNewTask() {
			await this.addNewTask(this.newTask);
			this.newTask = "";
		},
	},
	watch: {
		async currentProject() {
			if (this.currentProject) {
				this.setActiveProjectId(this.currentProject.id);
				await this.setTasksByProyectId();
			}
		},
	},
});
</script>

<style></style>
