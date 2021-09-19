<template>
	<div class="input-container flex items-center relative">
		<input
			type="checkbox"
			v-model="doneValue"
			:disabled="task.loadingChange"
			:class="checkboxClasses"
			class="rounded-full form-tick appearance-none h-5 w-5 border checked:border-transparent focus:outline-none mr-2 cursor-pointer"
		/>
		<input
			type="text"
			v-model="taskDescription"
			@blur="updateDescriptionTask($event)"
			@keypress.enter="updateDescriptionTask($event)"
			:disabled="task.loadingChange"
			class="bg-gray-900 w-full border-none outline-none focus:bg-gray-800 py-2 px-4"
		/>
		<i
			@click="deleteTask"
			:class="getActiveTextTheme"
			class="fas fa-times absolute right-3 top-3 cursor-pointer"
		></i>
	</div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { defineComponent, PropType } from "vue";
import { ITask } from "../types/project.interface";

export default defineComponent({
	name: "TaskInput",
	props: {
		task: {
			type: Object as PropType<ITask>,
			required: true,
		},
	},
	data() {
		return {
			taskDescription: this.task.description,
			done: this.task.done,
		};
	},
	computed: {
		...mapGetters("ui", [
			"getActiveBgTheme",
			"getActiveTextTheme",
			"getActiveBorderTheme",
		]),
		checkboxClasses(): string {
			return `${this.getActiveBorderTheme} checked:${this.getActiveBgTheme}`;
		},
		doneValue: {
			get() {
				return this.done;
			},
			set(value: boolean) {
				this.done = value;
				this.updateTask({
					taskId: this.task.id,
					value: value,
					property: "done",
				});
			},
		},
	},
	methods: {
		...mapActions("project", ["updateTask", "removeTask"]),
		updateDescriptionTask(event: Event) {
			event.stopPropagation();
			const target = event.target as HTMLInputElement;
			if (target.value !== this.task.description) {
				this.updateTask({
					taskId: this.task.id,
					value: target.value,
					property: "description",
				});
			}
		},

		async deleteTask() {
			await this.removeTask(this.task.id);
		},
	},
});
</script>

<style scoped>
i {
	display: none !important;
}
.input-container:hover i {
	display: block !important;
}
</style>
