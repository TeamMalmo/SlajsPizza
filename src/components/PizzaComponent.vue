<!-- SCRIPTS -->
<script setup>
import { computed, ref, onMounted } from 'vue';
import { useMenu } from '../composables/useMenu.js';

// destructure allt från vår composable
const { menu, isLoading, error, fetchMenu } = useMenu();

// filterar pizzorna ur menyn
const pizzas = computed(() => menu.value.filter(item => item.type === 'pizza'));

// enkelt state för att visa menyn
const isMenuShowing = ref(false);

// toggle funktionen
const toggleMenu = () => {
  isMenuShowing.value = !isMenuShowing.value;
};

// hämtar menyn när komponenten startas
onMounted(async () => {
  await fetchMenu();
});
</script>


<!-- TEMPLATE -->
<template>
    <div class="pizza-container">
      <h1>Pizza</h1>
      <!-- toogle pizza meny -->
      <button @click="toggleMenu" :disabled="isLoading">{{ isMenuShowing ? 'Hide Pizzas ⬆️' : 'Show Pizzas ⬇️' }}</button>
  
      <!-- renderar laddning eller error före menyn visas -->
      <div v-if="isLoading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
    
      <!-- meny visas om menyn är påslaget -->
      <div class="rendered-menu" v-show="isMenuShowing">
        <!-- loopar över alla pizzorna i menyn -->
        <div v-for="item in pizzas" :key="item.id" class="pizza-item">
            <div class="card-header">
                <h2>{{ item.name }}</h2>
                <h3>Price: {{ item.price }}:-</h3>
            </div>
            <div class="card-body">
                <div class="left">
                      <img :src="item.imgUrl" :alt="item.name" />
                  </div>
                  <div class="right">
                      <p>{{ item.description }}</p>
                 <!-- inre loop över toppings eller ingredienser -->
                  <ul v-if="item.toppings || item.ingredients">
                    <li v-for="topping in item.toppings || item.ingredients" :key="topping">
                      {{ topping }}
                    </li>
                  </ul>
                </div>
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
      gap : 1rem;
      /* min-height: 100vh; */
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    button {
        padding: 1rem;
        border: skyblue solid 3px;
        border-radius: 5px;
        color: skyblue;
        text-transform: uppercase;
        background-color: white;
    }
    

    .rendered-menu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap : 10px;
    }

    h2, h3 {
      text-align: center;
      margin: 0;
      color: white;
      font-size: 1.5rem;
    }

    h3 {
        font-size: 1rem;
    }
    .pizza-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      max-width: 500px;
      border: skyblue solid 3px;
      border-radius: 1rem;
      padding: 1rem;
      background-color: skyblue;
      gap: 1rem;
    }

    .pizza-item img {
      width: 200px;
      height: 200px;
    }

    .card-header {
        width: 100%;
      display: flex;
      /* flex-direction: column; */
      justify-content: space-between;
      align-items: center;
      gap : 1rem;
      text-align: left;
      height: 100%;
    }

    .card-body{
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .right, .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap : 1rem;
        text-align: left;
        height: 100%;
    }

    .right {
        max-width: 250px;
    }

    .pizza-item ul li {
        list-style:circle;
        text-align: left;
    }
</style>
