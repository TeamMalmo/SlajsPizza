<!-- SCRIPTS -->
<script setup>
import { useMenu } from '../composables/useMenu.js';
import { computed } from 'vue';

const { menu, isLoading, error, fetchMenu } = useMenu();


const pizzas = computed(() => menu.value.filter(item => item.type === 'pizza'));
const salads = computed(() => menu.value.filter(item => item.type === 'salad'));
const drinks = computed(() => menu.value.filter(item => item.type === 'drinks'));

console.log(menu.value);
</script>

<!-- TEMPLATE -->
<template>
<header>
  <h1>Pizza Slajs</h1>
</header>

<main>
  <p>Welcome to Pizza Slajs</p>
  <!-- <CardComponent?/> -->
  

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
