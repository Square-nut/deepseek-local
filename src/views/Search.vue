<template>
	<div>
		<strong>deepseek !!!!!</strong>
		<div class="container">
			<div class="search-bar">
				<hos-input v-model="value" type="textarea" :row="5" />
			</div>
			<div class="tool-bar">
				<div class="dib mr15">响应速度:{{ timer }}</div>
				<div class="dib mr15">
					<hos-select v-model="mo">
						<hos-option
							v-for="item in modelList"
							:key="item.model"
							:value="item.model"
							:label="item.name"
						></hos-option>
					</hos-select>
				</div>

				<hos-button @click="clear">Clear</hos-button>
				<hos-button @click="search" type="primary">Search</hos-button>
			</div>
			<div class="result">
				{{ result }}
			</div>
			<div class="html" v-html="result"></div>
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
			mo: 'deepseek-r1:1.5b',
			modelList: [],
      timer: 0,
		};
	},
	mounted() {
		this.$api('ollama.tags').then((res) => {
			this.modelList = res.models;
		});
	},
	methods: {
		search() {
			this.result = 'searching...';
			this.$api('workspace.chat', {
				message: this.value,
				mode: 'query',
				sessionId: sessionStorage.getItem('chatSessionId'),
				attachments: [],
			}).then((res) => {
        this.analysisData(res)
				// this.result = res.response;
				// this.timer = ((res.eval_count / res.eval_duration) * 10) ^ 9;
			});
		},
    analysisData(res) {
      this.result = res.textResponse;
    },
		clear() {
			this.value = '';
		},
	},
};
</script>
<style scoped lang="scss">
.container {
	width: 80%;
	height: 100vh;
	margin: auto;
	margin-top: 15px;
	.tool-bar {
		margin-top: 15px;
		text-align: right;
	}
}
</style>
