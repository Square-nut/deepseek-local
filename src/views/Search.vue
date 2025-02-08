<template>
	<div>
		deepseek !!!!!
		<div class="container">
			<div class="search-bar">
				<hos-input v-model="value" textarea :row="3"/>
			</div>
			<div class="tool-bar">
				<hos-button @click="search">Search</hos-button>
			</div>
			<div class="result">
				{{ result }}
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'HomeView',
	components: {},
	data() {
		return {
			result: '',
			value: '',
		};
	},
	methods: {
    search() {
      this.result = 'searching...';
      setTimeout(() => {
        this.result = 'search result';
      }, 1000);
      this.$api('', { q: this.value }).then((res) => {
        this.result = res;
      });
    },
  },
};
</script>
<style scoped>
 .container {
   width: 80%;
   height: 100vh;
   margin: auto;
 }
</style>
