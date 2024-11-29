<!-- SCRIPTS -->
<script setup>
import { useMenu } from '../composables/useMenu.js';
import SaladComponent from './SaladComponent.vue';

const { menu, isLoading, error, fetchMenu } = useMenu();


console.log(menu.value);
</script>

<!-- TEMPLATE -->
<template>
<header>
  <h1>Pizza Slajs</h1>
</header>

<main>
  <p>Welcome to Pizza Slajs</p>
  <SaladComponent/>
</main>

<footer>
  <p>Made with 💩 by Malmö</p>
</footer>

</template>

<!-- STYLE -->
<style scoped>
header {
  background-color: skyblue;
  color: black;
  text-align: center;
}

main {
  background-color: white;
  color: black;
  text-align: center;
}

footer {
  background-color: skyblue;
  color: black;
  text-align: center;
}
</style>
