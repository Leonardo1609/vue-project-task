<template>
	<div class="px-10" v-if="currentProject">
		<h2 class="text-white font-bold text-2xl mb-6">
			Tasks of {{ currentProject.name }}
		</h2>

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

		<h3 class="mt-5 text-white" v-if="projectTasks.length === 0 && !loadingTasks">
			No tasks on this project, add one
		</h3>
		<template v-if="projectTasks.length && !loadingTasks">
			<ul class="mt-10 tasks-container">
				<li
					class="text-white"
					v-for="task in projectTasks"
					:key="task.id"
				>
					<TaskInput :task="task" />
				</li>
			</ul>
			<div class="w-full mt-5">
				<div
					:class="getActiveBorderTheme"
					class="mx-auto w-3/4 rounded-full overflow-hidden border h-4"
				>
					<div
						:class="getActiveBgTheme"
						class="h-4"
						:style="{ width: getProjectProgress + '%' }"
					></div>
				</div>
			</div>
		</template>
	</div>
	<div v-else>
		<p class="text-center text-white text-xl">Loading Project</p>
	</div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
		...mapState("project", ["addingTask", "loadingTasks"]),
		...mapGetters("ui", ["getActiveBgTheme", "getActiveBorderTheme"]),
		...mapGetters("project", [
			"getProjectBySlug",
			"getTasks",
			"getProjectProgress",
		]),
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
			if (this.addingTask) return;
			if (this.newTask) {
				await this.addNewTask(this.newTask.trim());
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
<style scoped>
.tasks-container {
	height: calc(100vh - 320px);
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
