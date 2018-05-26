<template>
  <div id="app">
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <a href="/" class="header item">
          <img class="logo" src="./assets/img/star-wars.png">
          &nbsp;
          SWAPI - Vue
        </a>
      </div>
    </div>

    <div class="ui vertical stripe segment body">
      <router-view/>
    </div>
    
    <div class="ui inverted vertical footer segment">
      <div class="ui container">
        <h3 class="ui inverted header">SWAPI - Vue</h3>
        <p>Developed by <a href="https://linkedin.com/in/marudits" target="_blank">marudits</a> copyright &copy; 2018</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  flex: 1 0 auto;

  .body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
}
</style>
