<template>
	<div class="w-full h-screen bg-gray-800 flex items-center justify-center">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "AuthLayout",
});
</script>

<style></style>
