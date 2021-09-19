<template>
	<div class="px-10" v-if="currentProject">
		<h2 class="text-white font-bold text-2xl mb-6">
			Tasks of {{ currentProject.name }}
		</h2>

		<h3 class="mb-5 text-white" v-if="projectTasks.length === 0">
			No tasks on this project, add one
		</h3>
		<form class="flex" @submit.prevent="submitNewTask">
			<input
				type="text"
				v-model="newTask"
				class="w-full rounded-tl-xl rounded-bl-xl outline-none border-none px-5 text-lg bg-gray-700 text-white"
				placeholder="Add new task"
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
	<div v-else>
		<p>Loading Project</p>
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
			currentProject: null as IProject | null,
		};
	},
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
		...mapGetters("project", ["getProjectBySlug", "getTasks"]),
		/* currentProject(): IProject { */
		/* 	return this.getProjectBySlug(this.slug); */
		/* }, */
		projectTasks(): ITask[] {
			return this.getTasks;
		},
	},
	methods: {
		...mapMutations("project", ["setActiveProjectId"]),
		...mapActions("project", [
			"setTasksByProyectId",
			"addNewTask",
			"searchProjectBySlug",
		]),
		async submitNewTask() {
			if (this.newTask) {
				await this.addNewTask(this.newTask);
				this.newTask = "";
			}
		},
		async initialized() {
			this.currentProject = null;
			this.currentProject = await this.searchProjectBySlug(this.slug);
			if (this.currentProject) {
				this.setActiveProjectId(this.currentProject.id);
				await this.setTasksByProyectId();
			} else {
				this.$router.replace({ name: "no-project" });
			}
		},
	},
	async created() {
		await this.initialized();
	},
	watch: {
		async slug() {
			await this.initialized();
		},
	},
});
</script>
