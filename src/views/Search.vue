<template>
  <div>
    deepseek !!!!!
    <div class="container">
      <div class="search-bar"></div>
      <div class="tool-bar"></div>
      <div class="result">
        {{ result }}
      </div>

    </div>
  </div>

</template>
<script>
  export default {
    name: 'HomeView',
    components: {
      HelloWorld
    },
    data() {
      return {
        result: ''
      }
    },
    methods: {
      
    },
  }
</script>
<style scoped></style>