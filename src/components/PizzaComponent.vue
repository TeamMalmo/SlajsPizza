<!-- SCRIPTS -->
<script setup>
// Computed property to filter pizzas
import { computed } from 'vue';
import {useMenu} from '../composables/useMenu.js';

const { menu, isLoading, error, fetchMenu } = useMenu();
const pizzas = computed(() => menu.value.filter(item => item.type === 'pizza'));
</script>

<!-- TEMPLATE -->
<template>
<div class="pizza-container">
  <h1>Pizza</h1>
  <button @click="fetchMenu" :disabled="isLoading">Show Our Pizzas</button>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="pizzas.length">
    <div v-for="item in pizzas" :key="item.id" class="pizza-item">
        <div class="left">
            <h2>{{ item.name }}</h2>
            <img :src="item.imgUrl" :alt="item.name" />
        </div>
        <div class="right">
        <p>{{ item.description }}</p>
        <p>Price: {{ item.price }}</p>
        <ul v-if="item.toppings || item.ingredients">
            <li v-for="topping in item.toppings || item.ingredients" :key="topping">
            {{ topping }}
            </li>
        </ul>
        </div>
    </div>
  </div>
</div>

</template>

<!-- STYLE -->
<style scoped>
    .pizza-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap : 10px;
      min-height: 100vh;
    }

    .pizza-item {
      display: flex;
      /* flex-direction: column; */
      justify-content: space-between;
      align-items: center;
      max-width: 500px;
    }

    .pizza-item img {
      width: 200px;
      height: 200px;
    }
</style>
