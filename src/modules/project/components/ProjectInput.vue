<template>
	<div class="w-full">
		<div class="flex mb-5">
			<button
				:class="[
					getActiveBgTheme,
					{ 'opacity-50': currentAction === 'add' },
				]"
				class="flex-1 rounded-tl-full rounded-bl-full text-white text-lg py-2 px-3"
				@click="changeCurrentAction('search')"
			>
				Buscar
			</button>
			<button
				:class="[
					getActiveBgTheme,
					{ 'opacity-50': currentAction === 'search' },
				]"
				class="flex-1 rounded-tr-full rounded-br-full text-white text-lg py-2 px-3"
				@click="changeCurrentAction('add')"
			>
				Agregar
			</button>
		</div>
		<form class="flex">
			<input
				v-if="currentAction === 'search'"
				id="search-input"
				class="w-full outline-none border-none px-5 text-sm bg-gray-700 text-white "
				placeholder="Buscar Proyecto"
				type="text"
				:value="searchTerm"
				@input="$emit('update:searchTerm', $event.target.value)"
			/>
			<input
				v-else
				placeholder="Nuevo proyecto"
				id="add-input"
				class="w-full outline-none border-none px-5 text-sm bg-gray-700 text-white"
				type="text"
				:value="addTerm"
				@input="$emit('update:addTerm', $event.target.value)"
			/>
			<button
				:class="getActiveBgTheme"
				class="flex-1 rounded-tr-full rounded-br-full text-white text-lg py-2 px-5"
			>
				<i :class="iconButton" class="fas"></i>
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ProjectInput",
	props: {
		searchTerm: {
			type: String,
			required: true,
		},
		addTerm: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			currentAction: "search",
		};
	},
	computed: {
		...mapGetters("ui", ["getActiveBgTheme"]),
		iconButton() {
			return this.currentAction === "search" ? "fa-search" : "fa-plus";
		},
	},
	methods: {
		changeCurrentAction(action: "search" | "add") {
			if (action === "search") {
				this.currentAction = "search";
				this.$emit("update:addTerm", "");
			} else {
				this.currentAction = "add";
				this.$emit("update:searchTerm", "");
			}
		},
	},
	emits: ["update:searchTerm", "update:addTerm"],
});
</script>

<style></style>
