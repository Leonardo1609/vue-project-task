<template>
	<div v-if="loadingUser">Loading...</div>

	<router-view v-else />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
	computed: {
		...mapState("auth", ["loadingUser", "authenticated"]),
	},
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
